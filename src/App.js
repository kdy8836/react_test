import logo from './logo.svg';
import './App.css';
function Header(props){ //사용자 정의 태그 = 컴포넌트
  console.log('props',props, props.title);
  return <header>
  <h1><a href="/">{props.title}</a></h1>
</header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)
  }
  return <nav>
    <ol>
      {lis}      
    </ol>
  </nav>
}
function Article(props){
  console.log('props',props, props.title)
  return <article>
     <h2>{props.title}</h2>
     {props.body}
  </article>
}
function App() {
  const topics = [
    {id:1, title: 'html', body:'html is ...'},
    {id:2, title: 'css', body:'css is ...'},
    {id:3, title: 'javascript', body:'javascript is ...'}
  ]
  return ( //컴퍼넌트로 만들었음.
    <div>
      <Header title="WEB"></Header>
      <Nav topics ={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
      <Article title="Hi" body="Bye"></Article>
    </div>
  );
}

export default App;

/*
리액트는 사용자 정의 태그를 만드는 기술.
컴포넌트 만들기.
리액트에서 사용자 정의 태그를 만들 때는 반드시 대문자로 시작.
props는
*/ 