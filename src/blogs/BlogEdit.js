import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useBlog } from '../contexte/BlogContext';
import Input from '../components/Input';
import RTE from '../components/RTE';
import Button from '../components/Button';

const BlogEdit = () => {
  const { id } = useParams();
  const { blogs, UpdateBlog, DeleteBlog } = useBlog();
  const navigate = useNavigate();
  const blog = blogs.find(blog => blog.id === id);

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: '',
      content: '',
      imageFile: null,
    }
  });

  useEffect(() => {
    if (blog) {
      setValue('title', blog.title);
      setValue('content', blog.content);
    }
  }, [blog, setValue]);

  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const imageFile = data.imageFile ? data.imageFile[0] : null;
      await UpdateBlog(id, data.title, data.content, imageFile);
      navigate('/blogs');
    } catch (error) {
      setError('Erreur à la modification du blog: ' + error.message);
    }
  };
  const handleDelete = async () => {
    try {
      await DeleteBlog(id, blog.id);
    } catch (error) {
      setError('Erreur à la suppression du blog: ' + error.message);
    }
    navigate('/blogs');
  }
  
  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div className="w-full relative overflow-hidden  bg-gray-400 border-none py-10" >
      <h1 className='text-blue-500 text-5xl bold text-center mb-10'>Edit Blog</h1>
      {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
      <form 
        className='space-y-4 ml-5 bg-gray-300 p-5 rounded-lg'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='text-black-500 text-3xl bold'>
          <Input
            label="Title"
            {...register('title', { required: true })}
            type="text"
            className="mb-4"
          />
        </div>
        <div className='text-black-500 text-3xl bold 1/3 px-2'>
          <Input 
            label="Image"
            type="file" 
            className='mb-4'
            accept="image/png, image/jpeg, image/jpg"
            {...register("imageFile")} 
          />
          {blog.image && <img src={blog.image} alt={blog.title} className='object-cover h-24 w-24 rounded-full overflow-hidden border' />}
        </div>
        <div className='text-black-500 text-3xl bold'>
          <RTE 
            label="Content"
            name="content"
            control={control} 
            defaultValue={blog.content}
          />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}
        <Button 
          type="submit"
          className='bg-green-500 text-white m-10'
        >
          Modifiez le Blog
        </Button>
        <Button 
          type="submit"
          className='bg-red-500 text-white m-10'
          onClick={handleDelete}
        >
          Supprimez le Blog
        </Button>
      </form>
    </div>
  );
};

export default BlogEdit;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useBlog } from '../contexte/BlogContext';
import Input from '../components/Input';
import RTE from '../components/RTE';
import Button from '../components/Button';

const BlogEdit = () => {
  const { id } = useParams();
  const { blogs, UpdateBlog, DeleteBlog } = useBlog();
  const navigate = useNavigate();
  const blog = blogs.find(blog => blog.id === id);

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: '',
      content: '',
      imageFile: null,
    }
  });

  useEffect(() => {
    if (blog) {
      setValue('title', blog.title);
      setValue('content', blog.content);
    }
  }, [blog, setValue]);

  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const imageFile = data.imageFile ? data.imageFile[0] : null;
      await UpdateBlog(id, data.title, data.content, imageFile);
      navigate('/blogs');
    } catch (error) {
      setError('Erreur à la modification du blog: ' + error.message);
    }
  };
  const handleDelete = async () => {
    try {
      await DeleteBlog(id, blog.id);
    } catch (error) {
      setError('Erreur à la suppression du blog: ' + error.message);
    }
    navigate('/blogs');
  }
  
  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div className="w-full relative overflow-hidden  bg-gray-400 border-none py-10" >
      <h1 className='text-blue-500 text-5xl bold text-center mb-10'>Edit Blog</h1>
      {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
      <form 
        className='space-y-4 ml-5 bg-gray-300 p-5 rounded-lg'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='text-black-500 text-3xl bold'>
          <Input
            label="Title"
            {...register('title', { required: true })}
            type="text"
            className="mb-4"
          />
        </div>
        <div className='text-black-500 text-3xl bold 1/3 px-2'>
          <Input 
            label="Image"
            type="file" 
            className='mb-4'
            accept="image/png, image/jpeg, image/jpg"
            {...register("imageFile")} 
          />
          {blog.image && <img src={blog.image} alt={blog.title} className='object-cover h-24 w-24 rounded-full overflow-hidden border' />}
        </div>
        <div className='text-black-500 text-3xl bold'>
          <RTE 
            label="Content"
            name="content"
            control={control} 
            defaultValue={blog.content}
          />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}
        <Button 
          type="submit"
          className='bg-green-500 text-white m-10'
        >
          Modifiez le Blog
        </Button>
        <Button 
          type="submit"
          className='bg-red-500 text-white m-10'
          onClick={handleDelete}
        >
          Supprimez le Blog
        </Button>
      </form>
    </div>
  );
};

export default BlogEdit;