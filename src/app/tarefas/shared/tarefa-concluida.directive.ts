// component x diretiva
// os dois sao criados da mesma forma, mas o componente gera uma tag html 
// e a diretiva gera um atributo html para alguma operação especifica que queira

import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[tarefaConcluida]'
})
export class TarefaConcluidaDirective implements OnInit {

  // o @input é uma entrada de dados que pode ser fornecido atraves do html
  @Input() tarefaConcluida: boolean;
 
  // o ElementRef é uma referência do elemento html que eu quero
  // adicionar no component. Isso associa a diretiva ao componente html
  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.tarefaConcluida) {
      this.el.nativeElement.style.textDecoration = "line-through";
    }
  }

}
