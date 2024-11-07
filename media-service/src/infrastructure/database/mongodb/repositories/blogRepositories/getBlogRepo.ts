import { Blog } from '../../models/blogSchema';
import { BlogEntity } from '../../../../../domain/entities';

export const fetchAllBlogs = async (): Promise<BlogEntity[]> => {
  try {
    const allBlogs = await Blog.find()
      .populate({
        path: 'author',
        select: 'firstname lastname email profileImage'
      })
      .exec();
    
    return allBlogs as BlogEntity[];
  } catch (error: any) {
    console.error('Error fetching blogs:', error.message);
    throw new Error(error?.message);
  }
};