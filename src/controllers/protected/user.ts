import { Request, Response } from "express";
import User from "../../models/User";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import bcrypt from 'bcryptjs'


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

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query;


    const partialMatchFields = ['first_name',"last_name", "title", "about", "skills", "location", 'email', "languages"];
    const partialMatchQueries: any = {};

    partialMatchFields.forEach(field => {
      if (query[field]) {
        partialMatchQueries[field] = new RegExp(query[field] as string, 'i');
      }
    });


    partialMatchFields.forEach(field => {
      delete query[field];
    });

    const finalQuery = { ...query, ...partialMatchQueries };
    const users = await User.find(finalQuery);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }

}

export const updateUser = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const { email, country, 
    address, timezone, 
    city, phoneNumber, 
    role, organization, 
    zipcode, department, 
    birthday, first_name, 
    last_name, 
    skills, languages, 
    title, about,
   website_url, location,
  fb_url,twitter_url,linkdin_url,github_url,} = req.body;



  try {

    const updatedFields: { [key: string]: any } = {};
    if (email) updatedFields.email = email;
    if (first_name) updatedFields.first_name = first_name;
    if (last_name) updatedFields.last_name = last_name;
    if (city) updatedFields.city = city;
    if (country) updatedFields.country = country;
    if (address) updatedFields.address = address;
    if (phoneNumber) updatedFields.phone_number = phoneNumber;
    if (role) updatedFields.role = role;
    if (organization) updatedFields.organization = organization;
    if (birthday) updatedFields.birthday = birthday;
    if (department) updatedFields.department = department;
    if (zipcode) updatedFields.zipcode = zipcode;
    if (skills && skills?.length) updatedFields.skills = skills;
    if (languages && languages?.length) updatedFields.languages = languages;
    if (title) updatedFields.title = title;
    if (about) updatedFields.about = about;
    if (website_url) updatedFields.website_url = website_url;
    if (fb_url) updatedFields.fb_url = fb_url;
    if (twitter_url) updatedFields.twitter_url = twitter_url;
    if (linkdin_url) updatedFields.linkdin_url = linkdin_url;
    if (github_url) updatedFields.github_url = github_url;
    if (location) updatedFields.location = location;
    if (timezone) updatedFields.timezone = timezone;


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

// <------------ upload profile photo ---------------->

export const updateProfileImage = async (req: Request, res: Response) => {
  const user = req.user as { id: string };

  try {
    const userToUpdate = await User.findById(user.id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    if (userToUpdate.profile_photo) {
      const imagePath = path.join(__dirname, "../../../uploads", userToUpdate.profile_photo);
      await fs.unlink(imagePath);
    }

    userToUpdate.profile_photo = req.file.filename;
    await userToUpdate.save();

    res.status(200).json({ message: "Profile image updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProfileImage = async (req: Request, res: Response)=> {
  const user = req.user as { id: string };

  try {
    const userToUpdate = await User.findById(user.id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    
    if (userToUpdate.profile_photo) {
      const imagePath = path.join(__dirname, "../../../uploads", userToUpdate.profile_photo);
      await fs.unlink(imagePath);
      userToUpdate.profile_photo = "";
      await userToUpdate.save();
    }

    res.status(200).json({ message: "Profile image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// <------------ upload profile photo ---------------->

// <----------------- user images array ------------->
export const uploadUserImages = async (req: Request, res: Response) => {
  const user = req.user as { id: string };

  try {
    const userToUpdate = await User.findById(user.id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No Image provided" });
    }

    // Save new image path to the user's array of images
    userToUpdate.user_images = [req.file.filename, ...userToUpdate.user_images];
    await userToUpdate.save();

    res.status(200).json({ message: "Image added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const deleteUserImage = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const { imageName } = req.params;

  try {
    const userToUpdate = await User.findById(user.id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!userToUpdate.user_images.length) {
      return res.status(404).json({ message: "Images not found" });
    }

    // Remove the image from the array
    userToUpdate.user_images = userToUpdate.user_images.filter((filename) => filename !== imageName);

    // Delete the image file
    const imagePath = path.join(__dirname, "../../../uploads", imageName);
    await fs.unlink(imagePath);

    await userToUpdate.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// <----------------- user images array ------------->

// <----------- user video array ----------------->

export const uploadUserVideo = async (req: Request, res: Response) => {
  const user = req.user as { id: string };

  try {
    const userToUpdate = await User.findById(user.id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No Video provided" });
    }

    // Save new image path to the user's array of images
    userToUpdate.user_videos = [req.file.filename, ...userToUpdate.user_videos];
    await userToUpdate.save();

    res.status(200).json({ message: "Image added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const deleteUserVideo = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const { imageName } = req.params;

  try {
    const userToUpdate = await User.findById(user.id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!userToUpdate.user_videos.length) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Remove the image from the array
    userToUpdate.user_videos = userToUpdate.user_videos.filter((filename) => filename !== imageName);

    // Delete the image file
    const imagePath = path.join(__dirname, "../../../uploads", imageName);
    await fs.unlink(imagePath);

    await userToUpdate.save();

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// <----------- user video array ----------------->

// <---------- user change password ---------------->

export const changePassword = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: string };

    // Find the user by ID
    const userToUpdate = await User.findById(user.id);

    // Check if the user exists
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { currentPassword, newPassword } = req.body;

    // Verify the current password
    const passwordMatch = await bcrypt.compare(currentPassword, userToUpdate.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.findByIdAndUpdate(user.id, { password: hashedNewPassword });

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// <---------- user change password ---------------->
