import React fromimport { useState } from 'react';
import 'bulma/css/bulma.min.css';
const  { cl } = require('../components/vib')

const Home = () => {
  
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: 'StaticForms - Contact Form',
    phone: '', // if any value received in this field, form submission will be ignored.
    message: '',
  //  replyTo: '', // this will set replyTo of email to email address entered in the form
    accessKey: 'ca27218b-1974-4c24-9058-0821d04ba7a5' // bf0a33e6-7e74-401a-bb42-ee0e8b5688f7 get your access key from https://www.staticforms.xyz
  });
    // <!-- Make sure you don't change the form action-->
    // <form action="https://api.staticforms.xyz/submit" method="post">
    //     <!-- Replace with accesKey sent to your email -->
    //     <input type="hidden" name="accessKey" value="e44fc5d0-0b52-4cb1-9f79-fefc3800d89c"> <!-- Required -->
    //     <input type="text" name="name"> <!-- Optional -->
    //     <input type="text" name="subject"> <!-- Optional -->
    //     <input type="text" name="email"> <!-- Optional -->
    //     <input type="text" name="phone"> <!-- Optional -->
    //     <textarea name="message"></textarea> <!-- Optional -->
    //     <!-- If you want replyTo to be set to specific email -->
    //     <input type="text" name="replyTo" value="myreplytoemail@example.com"> <!-- Optional -->
    //     <!-- Specify @ as reply to value if you want it to be customers email -->
    //     <input type="hidden" name="replyTo" value="@"> <!-- Optional -->
    //     <!-- If you want form to redirect to a specific url after submission -->
    //     <input type="hidden" name="redirectTo" value="https://example.com/contact/success"> <!-- Optional -->
    //     <input type="submit" value="Submit" />
    // </form>
  const [response, setResponse] = useState({
    type: '',
    message: ''
  });
  const handleChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
    cl({ ...contact, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await res.json();
      if (json.success) {
        setResponse({
          type: 'success',
          message: 'ок.'
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message: 'ошибка - скорее всего блокировщик рекламы. Надо...'
      });
    }
  };
  return (
    <div>
      <div className='section'>
        <div className='container'>
          <div className='columns'>
            <div className='column' />
            <div className='column  is-two-thirds'>
              <div
                className={
                  response.type === 'success'
                    ? 'tile box notification is-primary'
                    : 'is-hidden'
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className={
                  response.type === 'error'
                    ? 'tile box notification is-danger'
                    : 'is-hidden'
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className={response.message !== '' ? 'is-hidden' : 'columns'}
              >
                <div className='column content'>
                  <h2>Форма заказа</h2>
                  <form
                    action='https://api.staticforms.xyz/submit'
                    method='post'
                    onSubmit={handleSubmit}
                  >
                    <div className='field'>
                      <label className='label'>Имя</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='text'
                          placeholder='имя'
                          name='name'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Город + данные</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='email'
                          placeholder='почта'
                          name='email'
                          onChange={handleChange}                  
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Ссылка</label>
                      <div className='control'>
                        <input
                          className='input'
                          type='email'
                          placeholder='url'
                          type='url'
                          name='$url'                          
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Тел</label>
                      <div className='control'>
                        <input
                          type='text'
                          className='input'
                          placeholder='phone'
                          name='phone'                          
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Дополнительно</label>
                      <div className='control'>
                        <textarea
                          className='textarea'
                          placeholder='...'
                          name='message'
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>          
                        <input
                          type='hidden'
                          name='redirectTo'
                          value="https://ne.now.sh"
                        />
                    <div className='field is-grouped'>
                      <div className='control'>
                        <button className='button is-primary' type='submit'>
                          ok
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='column' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
