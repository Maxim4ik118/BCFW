import { Alert, Loader } from 'components';
import ContactForm from 'components/ContactForm/ContactForm';
import WithAuthRedirect from 'HOC/WithAuthRedirect';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContactRequest,
  deleteContactRequest,
  getContactsRequest,
} from 'redux/contactsSlice/contactSlice';
import {
  selectContactError,
  selectContacts,
  selectContactStatus,
} from 'redux/contactsSlice/selectors';
import { selectIsLoggedIn } from 'redux/userSlice/selectors';

function ContactsPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const contacts = useSelector(selectContacts);
  const status = useSelector(selectContactStatus);
  const error = useSelector(selectContactError);

  useEffect(() => {
    if (!isLoggedIn) return;

    dispatch(getContactsRequest());
  }, [isLoggedIn, dispatch]);

  const handleSubmit = formData => {
    dispatch(addContactRequest(formData));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContactRequest(contactId));
  };

  return (
    <div>
      <ContactForm onSubmit={handleSubmit} />
      {status === 'pending' && <Loader />}
      {error !== null && (
        <Alert>
          <p>Oops, some error occured... {error}</p>
        </Alert>
      )}
      {contacts?.length > 0 && (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              <p>
                <b>Name: </b>
                {contact.name}
              </p>
              <p>
                <b>Number: </b>
                {contact.number}
              </p>
              <button onClick={() => handleDeleteContact(contact.id)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WithAuthRedirect(ContactsPage, '/sign-in');
