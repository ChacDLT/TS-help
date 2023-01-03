import './App.css';
import useForm from './hooks/UseForm';

interface ILogin {
  name: string;
}

function App() {

  const onSubmitClicked = (data: ILogin) => {
    console.log('Data: ', data);

  };

  const { data, errors, handleChange, handleSubmit } = useForm<ILogin>({
    initialValues: { name: '' },
    onSubmit: () => onSubmitClicked(data),
  }); 

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <label htmlFor="Name">
          <div>
            <p >Name</p>
            <input
              name="name"
              type="text"
              onChange={handleChange('name')}
            />
          </div>
        </label>
        <button type='submit'>
          Submit
        </button>
        </form>

    </div>
  );
}

export default App;
