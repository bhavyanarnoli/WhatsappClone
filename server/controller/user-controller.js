import User from '../model/User.js';

export const addUser = async (req, res) => {
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

export const getUsers = async (req, res) => { 
  try{
    const users = await User.find({});
    if(!users) {
      return res.status(404).json({message: 'No users found'});
    }
    return res.status(200).json(users); 
  }
  catch (error) {
    return res.status(500).json({message: error.message});
  }
}
export default { addUser, getUsers };

