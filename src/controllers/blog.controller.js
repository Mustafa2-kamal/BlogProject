import blogModel from "../models/blog.model.js";


// Create a new blog
export const addBlog=async(req,res)=>{

    try{
        const {title,body} = req.body;
        const UserId=req.user.id;

        const createBlog=await blogModel.create({title,body,UserId});

        return res.status(201).json({ message: 'Blog added successful', data: createBlog});

    }catch(err){
        return res.status(500).json({ message: 'error', error: err.message });
    }
}

// Get all blogs for specific user
export const getBlogs=async(req,res)=>{

    try{
        const UserId=req.user.id;

        const blogs=await blogModel.findAll({where:{UserId}});

        return res.status(200).json({ message: 'success',blogs });

    }catch(err){
        return res.status(500).json({ message: 'error', error: err.message });
    }
}


// Update blog by id
export const updateBlog=async(req,res)=>{

    try{
        const blogId = req.params.blogId;

        const [updatedRowsCount]=await blogModel.update({...req.body},{where:{id:blogId,UserId:req.user.id}});

        if (updatedRowsCount==0) {
            return res.status(404).json({message: 'Blog not found'});
        }

        return res.status(200).json({ message: 'Blog updated successfully'});

    }catch(err){
        return res.status(500).json({ message: 'error', error: err.message });
    }
}


// Delete blog by id
export const deleteBlog=async(req,res)=>{

    try{
        const blogId = req.params.blogId;

        const deletedRowsCount=await blogModel.destroy({where:{id:blogId,UserId:req.user.id}});

        if (deletedRowsCount==0) {
            return res.status(404).json({message: 'Blog not found'});
        }

        return res.status(200).json({ message: 'Blog deleted successfully'});

    }catch(err){
        return res.status(500).json({ message: 'error', error: err.message });
    }
}