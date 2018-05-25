import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const formClass = `form-group ${ touched && error ? 'has-danger' : ''}`;
    
    return (
      <div className={formClass}>
        <label>{field.label}</label>
        <input 
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmission(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmission.bind(this)) }>
        <Field 
          name="title"
          label="Title"
          component={this.renderField}
        />
        <Field 
          name="categories"
          label="Categories"
          component={this.renderField}
        />
        <Field 
          name="content"
          label="Post Content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) { // Validate inputs from 'values'
  const errors = {} 

  if(values.title && values.title.length <3) {
    errors.title = "Title must be at least 3 characters.";
  }
  if(!values.title) {
    errors.title = "Enter a title!";
  }
  if(!values.categories) {
    errors.categories = "Enter some categories!";
  }
  if(!values.content) {
    errors.content = "Enter some content!";
  }
  return errors;  // if errors === empty, the form submits
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost } )(PostsNew)
);