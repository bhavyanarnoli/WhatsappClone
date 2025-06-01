import User from '../model/User.js';

export const addUser = async (req, res) => {
  console.log('Final request body:', req.body);
  try{
    let exist = await User.findOne({sub: req.body.sub});
    if( exist) {
      res.status(200).json({msg: 'User already exists'});
      return;
    }
    const newUser = new User( req.body ); 
    await newUser.save();
    return res.status(200).json(newUser);

  }
  catch (error) {
    return res.status(500).json({message: error.message});
  }
}