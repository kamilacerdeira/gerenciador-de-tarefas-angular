import { Injectable } from '@angular/core';
import { Tarefa } from './'

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor() { }

  //quando chamado vai retornar um array com todas as tarefas armazenadas no localStorage
  listarTodos(): Tarefa[] {
    const tarefas = localStorage['tarefas'];
    return tarefas ? JSON.parse(tarefas) : [];
  }

  //primeiro passo é obter o array de tarefas já existente para concatenar a nova tarefa
  //cria-se um id para essa nova tarefa
  //concatena a nova tarefa na lista de tarefas retornada pelo localstorage
  //por fim, converte em string e armazena no localstorage
  cadastrar(tarefa: Tarefa): void {
    const tarefas = this.listarTodos();
    tarefa.id = new Date().getTime();
    tarefas.push(tarefa);
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  //lista todas as tarefas e com o método find do JS busca a tarefa por ID
  buscarPorId(id: number): Tarefa {
    const tarefas: Tarefa[] = this.listarTodos();
    return tarefas.find(tarefa => tarefa.id === id);
  }

  //lista todas as tarefas, encontra a tarefa que quer ser editada e substitui o objeto
  //o for pela lista de tarefas retornada recebe 3 parametros: obj(a tarefa em si), 
  //index(a posiçao dessa tarefa) e objs(a lista de tarefas)
  //a partir do ID encontra-se a tarefa que está sendo editada
  //olha a posição dela dentro da lista de tarefas (objs) e atribui a nova tarefa editada
  atualizar(tarefa: Tarefa): void {
    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach((obj, index, objs) => {
      if (tarefa.id === obj.id) {
        objs[index] = tarefa;
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  //o remover recebe um id da tarefa a ser removida
  //com o filter retornamos todas as tarefas que tem o id diferente do que deve ser removido
  //ou seja, é retornada uma lista com todas as tarefas exceto a escolhida p ser removida
  remover(id:number): void {
    let tarefas: Tarefa[] = this.listarTodos();
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  //a ideia aqui é inverter o boolean da propriedade concluida passada no tarefa.model
  alterarStatus(id:number): void {
    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].concluida = !obj.concluida;
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }
}

