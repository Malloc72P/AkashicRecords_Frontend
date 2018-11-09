import React, { Component } from 'react';
import Popup from "reactjs-popup";
import axios from 'axios';
import  tinymce from    'tinymce';

class PostWriterEngine extends Component{

	constructor() {
        super();
        this.state = { editor: null };
      }
      componentDidMount() {
        tinymce.init({
          selector: `#${this.props.id}`,
          setup: editor => {
            this.setState({ editor });
            editor.on('keyup change', () => {
              const content = editor.getContent();
              this.props.onEditorChange(content);
            });
          }
        });
      }
    
      componentWillUnmount() {
        tinymce.remove(this.state.editor);
      }
	render(){
		return(
			<textarea
                id={this.props.id}
                value={this.props.content}
                onChange={e => console.log(e)}
            />
		);
	}
}
export default PostWriterEngine;
