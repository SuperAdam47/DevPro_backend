import { Request, Response } from "express";
import User from "../../models/User";

export const getUser = async (req: Request, res: Response) => {
  console.log(req.user);
  const user = req.user as { id: string }; 

  try {
    const users = await User.findById(user.id); 
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
    const user = req.user as { id: string };
    const { email, name } = req.body; 
  
    
    if (!email && !name) {
      return res.status(400).json({ message: "At least one field (email or name) is required for update." });
    }
  
    try {
    
      const updatedFields: { [key: string]: any } = {};
      if (email) updatedFields.email = email;
      if (name) updatedFields.name = name;
  
      
      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        updatedFields,
        {
          new: true, 
          runValidators: true, 
        }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

