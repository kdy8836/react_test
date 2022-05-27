//import logo from './logo.svg';
import './App.css';
import {useState} from 'react'; //state 훅 리액트에서 제공하는 기본 함수
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
        props.onChangeMode(Number(event.target.id)); //문자를 숫자로 컨버팅해주는 함수
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}     
    </ol>
  </nav>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name= "body" placeholder= "body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>     
    </form>
  </article>
}
function Article(props){
  return <article>
     <h2>{props.title}</h2>
     {props.body}
  </article>
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
  <form onSubmit={event=>{
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    props.onUpdate(title, body);
  }}>
    <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
      setTitle(event.target.value);
    }}/></p>
    <p><textarea name= "body" placeholder= "body" value={body} onChange={event=>{
      setBody(event.target.value);
    }}></textarea></p>
    <p><input type="submit" value="Update"></input></p>     
  </form>
</article>
}
function App() {
  //const _mode = useState('WELCOME'); // state(상태를 만드는 코딩)
  //const mode = _mode[0];
  //const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState ([
    {id:1, title: 'html', body:'html is ...'},
    {id:2, title: 'css', body:'css is ...'},
    {id:3, title: 'javascript', body:'javascript is ...'}
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title, body = null; //title, body 값을 초기화
    for(let i = 0; i < topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
      <li><a href={"/update/"+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick = {()=>{
        const newTopics = []
        for(let i =0; i < topics.length; i++){
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }}/></li>
      </>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE'){
    let title, body = null; //title, body 값을 초기화
  for(let i = 0; i < topics.length; i++){
    if(topics[i].id === id){
      title = topics[i].title;
      body = topics[i].body;
    }
  }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}
      for(let i = 0; i < newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }
  return ( //컴퍼넌트로 만들었음.
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics ={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
      <li><a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a></li>
      {contextControl}
      </ul>
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
prop은 외부자를 위한 데이터 state는 내부자를 위한 데이터 
*/ 