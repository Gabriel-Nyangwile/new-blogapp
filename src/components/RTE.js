import * as React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'


function RTE({
    name, control, label, defaultValue = "Welcome to TinyMCE!",
}) {

  return (
    <div className='w-full text-center text-base text-black/60'>
        {
            label && <label className='inline-block mb-1 pl-1'>{label}</label>
        }
        <Controller
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) => (
            <Editor 
            apiKey='wvnwcqmoiu69jnztpeewmwa3koijoz0e0s1ttv1pz0taqfj1'
            initialValue={defaultValue}
            init={{
                branding: false,
                height: 500,
                menubar: true,
                plugins: [
                    "image", 
                    "advlist",
                    "autolink",
                    "lists",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",

                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    
              }}
              onEditorChange={onChange}
              />
        )} 
        />
    </div>
  )
}

export default RTE