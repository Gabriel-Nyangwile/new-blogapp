import React, { useState } from 'react'
import { useBlog } from '../contexte/BlogContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { Form } from 'react-hook-form';


const BlogForm = ({blog, isEditing}) => {
  const [title, setTitle] = useState(blog? blog.title:'');
  const [content, setContent] = useState(blog? blog.content:'');
  const [imageFile, setImageFile] = useState(null);
  const { CreateBlog, UpdateBlog } = useBlog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      //
      await UpdateBlog(blog.id, title, content, imageFile);
    } else {
      // CreateBlog(title, content, imageFile);
      await CreateBlog(title, content, imageFile)
    }
    console.log('Blog created :', {title, content, imageFile});
  }


  return (
    <Form 
      onSubmit={handleSubmit}
    >
      <Input 
        type="text" 
        value={title} 
        onChange={(e)=> setTitle(e.target.value)} placeholder="Titre" 
      />
      <textarea 
        value={content} 
        onChange={(e)=> setContent(e.target.value)} placeholder="Contenu"
      >
      </textarea>
      <Input 
        type="file" 
        onChange={(e)=> setImageFile(e.target.files[0])} 
      />
      <Button 
        type="submit">
        {isEditing ? 'Modifier' : 'Créer'} le Blog
      </Button>
    </Form>
  )
}
export default BlogForm;
