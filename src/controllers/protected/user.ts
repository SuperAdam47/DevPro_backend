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
    const { email, name,skills,languages,title,about,website_url,location, } = req.body; 
  
    
  
    try {
    
      const updatedFields: { [key: string]: any } = {};
      if (email) updatedFields.email = email;
      if (name) updatedFields.name = name;
      if (skills) updatedFields.skills = skills;
      if (languages) updatedFields.languages = languages;
      if (title) updatedFields.title = title;
      if (about) updatedFields.about = about;
      if (website_url) updatedFields.website_url = website_url;
      if (location) updatedFields.location = location;
  
      
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

