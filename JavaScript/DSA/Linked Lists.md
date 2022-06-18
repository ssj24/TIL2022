# Linked Lists

대개 array를 이용해 리스트를 구현하지만

연결 리스트가 array보다 선호되는 경우가 있다



## Array의 단점

- 많은 언어에서 array의 길이가 고정되어 있어 다 찼을 때 새로운 데이터를 삽입하기 힘듦
- 데이터 삽입 및 제거 작업이 어려움

두 가지 단점은 JS에서는 큰 단점이 되지 않는다(`split()`)



그러나 JS array의 문제점은 array가 오브젝트로 실행되어 

array가 내장되어 있는 C++이나 자바에 비해 덜 효율적이라는 것이다

array를 활용한 작업이 너무 느리다고 생각되면 연결 리스트를 사용하자



**1차원 array가 쓰이는 곳**이라면 거의 대부분 연결 리스트를 사용할 수 있다

다만, **랜덤한 요소에 접근할 때는 array가 더 낫다**



## Linked Lists Defined

연결 리스트는 **노드**라고 불리는 오브젝트들의 집합니다

각 노드는 오브젝트 참조를 통해 다음의 노드와 연결되어 있다

이 참조를 **간선(link, edge)**이라고 한다



array 요소들이 위치에 의해 참조되는 것에 반해

연결 리스트의 요소들은 다른 요소들과의 관계에 의해 참조된다

한국 => 중국 => 일본 => Null

이 때, 중국이 한국 뒤에 있다고(중국 follows 한국) 표현하지 두번째에 있다고 하지 않는다



연결 리스트를 조회하려면 첫 노드부터 마지막 노드까지 링크를 따라가야 한다

헤더 노드는 연결 리스트의 입구를 표시하는데 사용되는 노드로(없어도 됨) 조회시 무시된다

헤더 => 한국 => 중국 => 일본 => Null



연결 리스트의 **마지막은 Null 노드를 가리킴**으로써 표현된다



연결 리스트에 새로운 노드를 삽입하는 것은 매우 쉬운 작업이다

삽입할 노드 이전에 있는 노드의(previous node) 간선을 새로 삽입할 노드를 가리키게 수정하고

새로운 노드의 간선은 이전 노드가 원래 가리키고 있던 노드를 가리키게 한다



노드를 삭제하는 것도 쉽다

삭제할 노드의 이전 노드의 간선은 삭제할 노드가 가리키던 곳을 가리키게 수정한다

삭제할 노드의 간선을 Null을 가리키게 수정하여 연결 리스트에서 없앤다



##  An Object-Based Linked List Design

Node 클래스로 연결 리스트에 노드를 더하고

LinkedList 클래스로 노드 삽입, 제거, 리스트 표시 및 다른 기능들을 수행하게 만든다



- The node class

  ```js
  function Node(element) {
    this.element = element; // 노드의 데이터
    this.next = null; // 간선
  }
  ```

  

- The linked list class

  ```js
  function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
  }
  ```

  헤드 노드는 간선을 null으로 해서 시작한 뒤

  연결리스트에 첫번째 노드가 삽입되면 해당 노드를 가리킨다

  (그래서 LList에서 새로운 노드를 만들기만 하고 next 속성을 바꾸지 않았다)

  

- 새로운 노드 삽입

  일단 삽입할 노드의 앞이나 뒤 노드를 특정해야 한다

  - 기존 노드의 뒤에 노드를 삽입하는 경우

    1. find()로 특정 데이터를 찾아서 해당 노드 반환

       ```js
       function find(item) {
         // 새로운 노드를 생성해 헤드 노드로 만든다
         var currNode = this.head;
         // 찾고 있는 데이터가 아니면 다음 노드로 넘어간다
         while (currNode.element != item) {
           currNode = currNode.next;
         }
         // 만약 찾지 못하면 null을 반환한다
         return currNode;
       }
       ```

    2. 새로운 노드의 next 속성을 찾은 노드의 next로 설정

    3. 기존 노드의 next 속성을 새로운 노드로 설정

       ```js
       function insert(newElement, item) {
         var newNode = new Node(newElement);
         var current = this.find(item);
         newNode.next = current.next;
         current.next = newNode;
       }
       ```

  - 연결 리스트 보여주기

    ```js
    function display() {
      var currNode = this.head;
      while(!(currNode.next == null)) {
        process.stdout.write(currNode.next.element);
        currNode = currNode.next;
      }
    }
    ```

    데이터가 있는 노드만 표시하기 위해(헤드 노드를 제외하기 위해)

    `currNode.next.element`를 프린트한다

    📌`process.stdout.write`: 개행문자 없이 프린트

    

- 노드 제거하기

  1. 제거할 노드의 앞에 있는 노드를 찾는다

  2. 앞의 노드의 next 속성을 제거할 노드의 뒤에 있는 노드를 가리키게 수정한다

     ```js
     function findPrevious(item) {
       var currNode = this.head;
       while(!(currNode.next == null) &&
            (currNode.next.element != item)) {
         currNode = currNode.next;
       }
       return currNode;
     }
     ```

  3. 노드 삭제

     ```js
     function remove(item) {
       var prevNode = this.findPrevious(item);
       if (!(prevNode.next == null)) {
         prevNode.next = prevNode.next.next;
       }
     }
     ```

     `prevNode.next = prevNode.next.next;`를 통해

     삭제할 노드의 앞에 있는 노드가 삭제할 노드의 뒤에 있는 노드를 가리키게 만든다

![](examples/Linked lists/Llist.png)