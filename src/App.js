import './App.css';
function Header(props){ //사용자 정의 태그 = 컴포넌트
  console.log('props',props, props.title);
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault(); //a태그가 동작하는 기본 동작을 방지한다. 클릭해도 리로드가 일어나지 않음.
    props.onChangeMode(); // 헤더를 클릭할 때 처리해야될 작업을 정의할 수 있도록 한 것. 
  }}>{props.title}</a></h1>
</header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(event.target.id);
      }}>{t.title}</a></li>)
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
      <Header title="WEB" onChangeMode={()=>{
        alert('Header'); 
      }}></Header>
      <Nav topics ={topics} onChangeMode={(id)=>{
        alert(id);
      }}></Nav>
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
함수를 정의해서 만들면 된다. 
props는 리액트에서 속성을 의미한다.
리액트는 자동으로 생성한 태그의 경우에는 key라는 약속된 prop을 준다.

*/ 