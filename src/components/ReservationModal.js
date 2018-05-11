import React from 'react';

//import '../styles/ReservationModal.css';

const ReservationModal = ({ onReservationSubmit, onReservationCancel, product, lastPerson }) => {

  function onFormSubmit(ev) {
    ev.preventDefault();
    const name = ev.target.elements.name.value;
    const email = ev.target.elements.email.value;
    const phone = ev.target.elements.phone.value;
    onReservationSubmit(product, { name, email, phone });
  }

  const dateDisclaimerJSX = (product.dispDate > new Date()) && (
    <p>Veuillez noter que la date de disponibilité est le <b>{ product.dispDate.toLocaleDateString("fr-FR") }</b>.</p>
  ) 

  const waitListJSX = (typeof product.waitList === "undefined" || product.waitList.length === 0)
    ? <div>
        <p>Vous êtes la première personne a vouloir cet article.</p>
        <p>Merci de remplir le formulaire suivant.</p>
      </div>
    : <div>
        <p><b>{ product.waitList.length } personne(s)</b> sont déjà dans la liste d'attente pour cet article.</p>
        <p>Si vous voulez rentrer dans cette liste, merci de remplir le formulaire suivant.</p>
      </div>

  return (
    <div className={ 'ReservationModal modal is-active' }>

      <div className="modal-background"></div>
      <form className="modal-card" onSubmit={ onFormSubmit }>

        <header className="modal-card-head">
          <div className="modal-card-title">Je Réserve</div>
          <button className="delete" type="button" aria-label="close" onClick={ onReservationCancel }></button>
        </header>

        <section className="modal-card-body">

          { console.log(product) }
          <p>Vous voulez reserver l'article suivant: <b>"{ product.name }"</b>.</p>
          { dateDisclaimerJSX }
          <hr/>
          { waitListJSX }
          <hr/>

          <div className="field">
            <label className="label">Nom Complet :</label>
            <div className="control has-icons-left">
              <input className="input" name="name" type="text" placeholder="John Doe" defaultValue={ lastPerson.name }/>
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">E-mail :</label>
            <div className="control has-icons-left">
              <input className="input" name="email" type="email" placeholder="nom@exemple.fr" defaultValue={ lastPerson.email }/>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Téléphone (optionnel) :</label>
            <div className="control has-icons-left">
              <input className="input" name="phone" type="tel" placeholder="01 23 45 67 89" defaultValue={ lastPerson.phone }/>
              <span className="icon is-small is-left">
                <i className="fas fa-phone"></i>
              </span>
            </div>
          </div>
        </section>

        <footer className="modal-card-foot">

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" type="submit">
                Confirmer
              </button>
            </div>
            <div className="control">
              <button className="button is-light" type="button" onClick={ onReservationCancel }>
                Annuler
              </button>
            </div>
          </div>

        </footer>
        
      </form>
    </div>
  )
};

export default ReservationModal;
