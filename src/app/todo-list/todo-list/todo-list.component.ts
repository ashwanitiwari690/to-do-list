import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todolist: any = []
  public title: any = ''
  public description: any = ''
  public titleerror: boolean = false
  public descriptionerror: boolean = false
  public btnname = 'Add'
  public ids = null;

  constructor() { }

  ngOnInit(): void {
    const sdata: any = localStorage.getItem('tododata')
    this.todolist = JSON.parse(sdata)
  }

  onsubmit() {
    this.titleerror = this.title != '' ? false : true
    this.descriptionerror = this.description != '' ? false : true
    if (this.title != '' && this.description != '') {
      if (this.ids != null) {
        this.todolist[this.ids].title = this.title
        this.todolist[this.ids].description = this.description
        this.btnname = 'Add'
        this.title = ''
        this.description = ''
        this.ids = null
        localStorage.setItem('tododata', JSON.stringify(this.todolist))
      } else {
        let sdata = { title: this.title, description: this.description }
        this.todolist.push(sdata)
        localStorage.setItem('tododata', JSON.stringify(this.todolist))
        this.title = ''
        this.description = ''
      }
    }
  }

  edittodo(index: any) {
    this.btnname = 'Update'
    this.ids = index
    const sdata = this.todolist.find((ele: any, i: any) => i == index)
    this.title = sdata.title
    this.description = sdata.description
  }

  deletetodo(index: any) {
    this.todolist.splice(index, 1)
    localStorage.setItem('tododata', JSON.stringify(this.todolist))
  }

}
