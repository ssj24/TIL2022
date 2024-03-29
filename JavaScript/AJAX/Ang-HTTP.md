# ANG-http

프론트엔드가 db에 바로 store & fetch data하는 건 안전하지 않다

frontend ==http== server(api-rest, graphQL) ==== DB



- http request

  - URL(API endpoint): `/posts/1`

  - Http verb: post, get, put...
    which kind of request you want to send to the endpoint

  - headers: metadata
    content-type, title...

  - body: data

    optional.

    post, put, patch



- backend setup

  firebase

  database - create db - start in test mode





## post

```typescript
// app.module
// HttpClientModule import

// app.component
constructor(http: HttpClient){}
onCreatePost(postData: { title: string; content: string;}) {
  this.http.post('https://...', postData)
}
```

post(url, body(, ))



`this.http.post(...)` won't make request

angular manages http request with observables

if the http request is not wrapped with observable, 

angular thinks no one cares the response

and it just not send the request.



```typescript
this.http.post(url, postData)
.subscribe(responseData => {
  console.log(responseData);
})
```



## getting all posts

```typescript
private fetchPosts() {
  this.http.get(url)
  .subscribe(posts => {console.log(posts)})
}
```

이 함수를 ngOnInit에서 부르면 처음부터 기존 post들을 불러오는 것



## transform response data

```typescript
.get()
.pipe(map(res => {
  const postsArr = [];
  for (const key in res) {
    if (res.hasOwnProperty(key)) {// key is generated by firebase, unique.
      postsArr.push({...res[key], id: key})
    }
  }
  return postsArr;
}))
```

import map from 'rxjs/operators';

map returns new data within observable.

since it returns observable, 

subscribe can comes after pipe.



## type with http client

```typescript
.pipe(map((res: {[key:string]: {title: string, content: string, id?:string}})))
```

`{title: string, content: string, id?:string}`이걸 Post 모델로 만들면 더 간단

```typescript
const postArr: Post[] = [];
```

아니면..

````typescript
.get<{[key:string]: Post}>
````



http관련한 건 service에서 하는 게 좋음

service에서 return before subscribe!!

````typescript
return this.http.get<{...}>(url)
  .pipe(map(res => {
    ...
    return postsArray;
  }));
````

  subscribe전에 리턴된 것을 component에서 받아서

```typescript
this.postsService.fetchPosts().subscribe(res => {
  console.log(res);
})
```

:exclamation: 262강 뒤쪽에 옵저버블 리턴의 장점 나옴



## setting headers

any http request(whether get, post, put..) have the last option

```typescript
this.http.get(url, {
  headers: new HttpHeaders({'Content-Type': 'application/json'})})
```

you could set custom header

`headers: new HttpHeaders({'Custom-Header': 'Hello'})`

see this custom header in network window



## adding query params

- params: new HttpParams().set('print', 'pretty')

- url에 직접 쓰기

- 변수를 만들어서..

  ````typescript
  let searchParams = new HttpParams();
  searchParams = searchParams.append('a', 'bcde');
  params: searchParams;
  ````

- params는 헤더의 마지막 오브젝트에 넣는 것.



## real app ang 9강

```typescript
//service
public createNewUser(dataObj: any) {
  return new Promise((resolve, reject) => {
    this.http.post('http://localhost: 30000/users', dataObj)
    .subscribe(
      (res) => {
        resolve(res);
      },
      (err) => {
      	reject(err);
    })
  })
}
```

```typescript
// component
create() {
  this.userService.createNewUser(this.createAccountForm.value)
  .then(res => console.log(res))
  .catch(err => console.log(err));
}
```



