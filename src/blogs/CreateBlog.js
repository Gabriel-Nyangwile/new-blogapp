import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import { useBlog } from '../contexte/BlogContext';
import RTE from '../components/RTE';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { useAuth } from '../contexte/AuthContext';

const CreateBlog = ({ blog }) => {
  const [error, setError] = useState('');
  const { CreateBlog, DeleteBlog } = useBlog();
  const { isLogged = true, user } = useAuth();
  const { id } = useParams
  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      title: blog?.title || '',
      content: blog?.content || '',
      imageFile: null,
    }
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.imageFile ? data.imageFile[0] : null;
      await CreateBlog(data.title, data.content, imageFile);
      
    } catch (error) {
      setError('Erreur à la création du blog: ' + error.message);
    }
    navigate('/blogs');
  };

  const handleClick = async () => {
    try {
      await DeleteBlog(id, blog.id);
    } catch (error) {
      setError('Erreur à la suppression du blog: ' + error.message);
    }
    navigate('/blogs');
  }

  return (
    <div>
      {!isLogged ? (<p className="text-red-500">You need to be logged in to create a blog</p>) : (
      <h5 className="text-green-500 text-2xl bold text-center m-5">Bonjour {user.firstname || user.email}, créez votre blog ici</h5>)}
      {/* <h1 className='text-blue-500 text-5xl bold text-center'>Create Blog</h1> */}
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
        </div>
        <div className=' text-black-500 text-3xl bold'>
          <RTE 
            className=" text-black-500 text-3xl bold"
            label="Content"
            name="content"
            control={control} 
            defaultValue={getValues('content')}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button 
          type="submit"
          className="bg-green-500 text-white m-10"
        >
          Créez votre Blog
        </Button>
        <Button 
          type="submit"
          className="bg-red-500 text-white m-10"
          onClick={handleClick}
        >
          Supprimez le Blog
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;