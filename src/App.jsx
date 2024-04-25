import { Badge } from './components/Badge';
import { Header } from './components/Header';
import { Event } from './components/Event';
import './index.css';

function App() {

  const testevent = {
    title: 'Dogs are cute',
    image: 'https://online.ntnu.no/_next/image?url=https%3A%2F%2Fonlineweb4-prod.s3.eu-north-1.amazonaws.com%2Fmedia%2Fimages%2Fresponsive%2Flg%2Ffe5c674c-336d-411e-85d5-e89f3be7df23.jpeg&w=1200&q=75',
  };

  return (
    <div>
      <Header />
      <Badge title ="hei" icon ="calender" />
      <Event event ={testevent}/>
    </div>
  );
}

export default App;