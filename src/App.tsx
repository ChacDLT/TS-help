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
      <form onSubmit={handleSubmit} className="flex-col items-center justify-center w-[460px] mx-auto mt-9">
      <label htmlFor="Name">
          <div className="flex flex-col">
            <p className="capitalize text-center font-medium">Name</p>
            <input
              className="w-full h-10 bg-[#F3F4F7] pl-5 font-medium rounded-lg"
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
