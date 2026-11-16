require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const crypto = require('crypto');
const prisma = require('./db.cjs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// ==============Middleware to verify JWT token ============
const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer <token>

 if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded;
    next()
  }catch(err){
    return res.status(401).json({ error: 'Unauthorized' });
  }

}



// ==================== LOGIN ROUTE ====================
app.post('/login', async (req, res) => {
  let { email, password } = req.body;

  if ( typeof email !== 'string' || typeof password !== 'string' || !password || email.trim() === '' || password.trim() === '') {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    email = email.trim().toLowerCase(); // Normalize email to lowercase
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    } 

    const jwtId = crypto.randomUUID();
    let jwtToken = jwt.sign({id:user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h',jwtid : jwtId}); 

    res.status(200).json({ message: 'Login successful welcome user ', user, token: jwtToken });  


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// ==================== SIGNUP ROUTE ====================
app.post('/signup', async (req, res) => {
  try {
 // 1. Destructure email alongside username and password
    let {email, password } = req.body;

    if ( typeof email !== 'string' || typeof password !== 'string' || !password || email.trim() === '' || password.trim() === '' || password.trim().length < 6) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    email = email.trim().toLowerCase(); // Normalize email to lowercase

    // 2. Check if the email (or username) already exists
    const existingUser = await prisma.user.findUnique({
        where: { email: email } 
      } 
    );
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    } 
    
    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user (Fixe the double prisma.prisma bug here too)
    const newUser = await prisma.user.create({
      data: {  
        email: email,
        password: hashedPassword   
      },
    });

    const jwtId = crypto.randomUUID();
    let jwtToken = jwt.sign({id:newUser.id, email: newUser.email}, process.env.JWT_SECRET, {expiresIn: '1h',jwtid : jwtId}); 

    res.status(201).json({ message: 'User created successfully', email: newUser.email, token: jwtToken });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }       
});




// ----------------------------- GET ALL USERS ROUTE ---------------------------
// app.get("/users", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// ----------------------------- GET PROFILE ROUTE ---------------------------
app.get("/me",requireAuth ,async (req, res) => {

  // dont read from token as name will not appear if user exist search in database for name to be accessable
  
  // const { id } = req.user;
  // if (!id) {
  // return res.status(404).json({ error: "User not found" })
  // };
  try{
  const user = await prisma.user.findUnique({
  where: { id: req.user.id },
  select: { name: true, email: true , updatedAt: true,id:true} // Select only the fields you want to return
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({
    success: true,
    data: user  
    });

  }catch(err){
    return res.status(401).json({ error: err })
  }
});


// ====================== GET DASHBOARD ROUTE ==================================
app.get("/dashboard",requireAuth,async (req,res)=>{

  const user = await prisma.user.findUnique
  ({
  where: { id: req.user.id },
  select: { name: true, email: true } 
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({
    success: true,
    message: `Welcome to your dashboard, ${user.name || user.email}!`,
    data: user
  });
  
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
