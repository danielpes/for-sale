import React from 'react'
import '../styles/Filter.css'

const Filter = ({ onCategoryDropdownChange, onSortDropdownChange, productCount }) => {
  
  const sortDropdownJSX = (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Trier par:</label>
      </div>
      <div className="field-body">
        <div className="field is-narrow">
          <div className="control">
            <div className="select is-fullwidth">
              <select onChange={ onSortDropdownChange }>
                <option value="name">Ordre alphabétique</option>
                <option value="priceAsc">Prix - croissant</option>
                <option value="priceDesc">Prix - décroissant</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const categoryDropdownJSX = (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Catégorie: </label>
      </div>
      <div className="field-body">
        <div className="field is-narrow">
          <div className="control">
            <div className="select is-fullwidth">
              <select onChange={ onCategoryDropdownChange }>
                <option value="all">Toutes</option>
                <option value="Meuble">Meubles</option>
                <option value="Électroménager">Électroménagers</option>
                <option value="Informatique">Informatique</option>
                <option value="Objet(s)">Objets / Autres</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const freeOnlyCheckboxJSX = (
    <div className="control">
      <label className="checkbox">
        <input type="checkbox"/> Gratuit seulement
      </label>
    </div>
  );


  const filterIconJSX = (
    <span className="icon is-medium">
      <i className="fas fa-filter"></i>
    </span>
  );

  const countLabelJSX = (
    <span><span>{ `${productCount} articles` }</span><span className="hide-if-needed"> affichés</span>.</span>
  );

  return (
    <div className="Filter columns is-2">
      <div className="column is-narrow">{ categoryDropdownJSX }</div>
      <div className="column is-narrow">{ sortDropdownJSX }</div>
      <div className="column auto count">{ countLabelJSX }</div>
    </div>
  );
};

export default Filter;