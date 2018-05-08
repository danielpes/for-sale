import React from 'react';

import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_green.css'
import 'flatpickr/dist/l10n/fr';
import '../styles/NewProductModal.css';

class NewProductModal extends React.Component {

  constructor(props) {
    super(props);
    this.onAddProductSubmit = props.onAddProductSubmit;
    this.onAddProductCancel = props.onAddProductCancel;
    this.state = {
      isLoading: false,
      data: {
        name: "",
        category: "",
        description: "",
        price: null,
        dispDate: new Date(),
        files: []
      }
    };
  }

  setField(keyValue) {
    this.setState(prevState => {
      return {
        data: { ...prevState.data, ...keyValue }
      };
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ isLoading: true });
    const {files, ...data} = this.state.data;
    this.onAddProductSubmit({ ...data, deleting: false }, files);
  }

  formatFilesLabel() {
    const fileCount = this.state.data.files.length;
    const pluralMark = (fileCount === 1) ? '' : 's';
    return `${fileCount} image${pluralMark} selected`;
  }

  formatButtonClass(currentClasses) {
    const loadingClass = this.state.isLoading ? ' is-loading' : ''
    return `${currentClasses}${loadingClass}`
  }

  render() {
    return (
      <div className={ 'NewProductModal modal is-active' }>

        <div className="modal-background"></div>
        <form className="modal-card" onSubmit={ this.handleSubmit }>

          <header className="modal-card-head">
            <p className="modal-card-title">Add Item</p>
            <button className='delete' type="button" aria-label="close" onClick={ this.onAddProductCancel }></button>
          </header>

          <section className="modal-card-body">

            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" name="name" type="text" onChange={ e => this.setField({name: e.target.value}) }/>
              </div>
            </div>

            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select name="category" onChange={ e => this.setField({category: e.target.value}) }>
                    <option>Meuble</option>
                    <option>Électroménager</option>
                    <option>Informatique</option>
                    <option>Objet(s)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea className="textarea" name="description" type="text" onChange={ e => this.setField({description: e.target.value}) }/>
              </div>
            </div>

            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input className="input" name="price" type="number" onChange={ e => this.setField({price: e.target.value}) }/>
              </div>
            </div>

            <div className="field">
              <label className="label">Disponibility Date</label>
              <div className="control">
                <Flatpickr 
                  className="input"
                  value={ this.state.data.dispDate }
                  onChange={ d => this.setField({ dispDate: d[0] }) } 
                  options={{
                    locale: "fr",
                    dateFormat: "d/m/Y"
                  }}
                />
              </div>
            </div>

            <label className="label">Image</label>
            <div className="file has-name">
              <label className="file-label">
                <input className="file-input" type="file" name="imageFile" multiple onChange={ e => this.setField({files: Array.from(e.target.files)}) }/>
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">
                    Choose the image files…
                  </span>
                </span>
                <span className="file-name">
                  { this.formatFilesLabel() }
                </span>
              </label>
            </div>
          </section>

          <footer className="modal-card-foot">

            <div className="field is-grouped">
              <p className="control">
                <button className={ this.formatButtonClass('button is-primary') } type="submit">
                  Confirm
                </button>
              </p>
              <p className="control">
                <button className={ this.formatButtonClass('button is-light') } type="button" onClick={ this.onAddProductCancel }>
                  Cancel
                </button>
              </p>
            </div>

          </footer>
          
        </form>
      </div>
    )
  }
};

export default NewProductModal;
