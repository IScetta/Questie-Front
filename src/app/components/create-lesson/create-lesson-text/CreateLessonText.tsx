"use client"

import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // Importa la función draftToHtml
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const convertToHtml = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    
    const html = draftToHtml(rawContentState);
    return html;
  };

  return (
     <div>

     </div>
  //   <div>
  //     <Editor
  //       editorState={editorState}
  //       onEditorStateChange={onEditorStateChange}
  //       localization={{
  //         locale: 'es',
  //       }}
  //       toolbar={{
  //         options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  //         inline: {
  //           options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
  //         },
  //         fontSize: {
  //           options: [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96],
  //         },
  //         font: {
  //           options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
  //         },
  //       }}
  //     />
  //     <div>
  //       <h2>Resultado:</h2>
  //       {/* Muestra el HTML resultante */}
  //       <div dangerouslySetInnerHTML={{ __html: convertToHtml() }} />
  //     </div>
  //   </div>
  );
};

export default DraftEditor;
