import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from '../interface/persona';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuarioComponent implements OnInit {
    
  //TEMPLATE-DRIVEN FORM

  usuarioActual: Persona = {
    _id: "",
    nombre: "",
    apellidos: "",
    edad: "",
    dni: "",
    fechaNacimiento: "",
    colorFavorito: "",
    sexo: ""
  };
  usuarios:Array<Persona> = [];
  evento:String = "insertar";
  posicion:number = 0;
  valido:boolean = true;

  constructor (private userService: UserService) {
  }


  ngOnInit(): void {
    this.getAllUsers();
  }

  // Funciones del CRUD definidas en el servicio

  // Subscripción al método GET alojado en el sevicio
  getAllUsers(){
    this.userService.getAllUsers().subscribe(( data : any ) => {
      this.usuarios = data;
      console.log(data);  
    },
    err => console.log('Se ha producido un error en la llamada al servicio', err));    
  }

  // Subscripción al método GETById alojado en el sevicio
  getUserById(posicionActualizar:number){
    this.usuarioActual._id = this.usuarios[posicionActualizar]._id;
    this.userService.getUserById(this.usuarioActual._id).subscribe(( user : any ) => {
      this.usuarioActual = user;
      this.evento = "actualizar";
    }, 
    err => console.log('Se ha producido un error en la llamada al servicio', err));
  }

  // Subscripción a los método POST y PUT alojados en el sevicio
  addUser(myForm : NgForm){
    if (myForm.valid){

      // Validador para el parámetro edad
      let edadNum = parseInt(this.usuarioActual.edad);
        if(edadNum > 0 && edadNum <=125 ){
          this.valido = true;
        } else {
          this.valido = false;
          alert("La edad del contacto no puede superar los 125 años."); 
        }

      // Método POST
      if(this.evento === "insertar"){
        this.userService.addUser(this.usuarioActual).subscribe(( user : any ) => {
          this.usuarios.push(user);
        }, 
        err => console.log('Se ha producido un error en la llamada al servicio', err));

      // Método PUT
      } else if (this.evento === "actualizar"){
        this.userService.updateUser(this.usuarioActual, this.usuarioActual._id).subscribe(( user : any ) => {
          user = this.usuarioActual;
          console.log('Usuario modificado,', this.usuarioActual._id);
        }, 
        err => console.log('Se ha producido un error en la llamada al servicio', err));
        this.evento = "insertar";
      }
  
      this.getAllUsers();

      // Reiniciar el formulario
      if (this.valido === true){
        myForm.form.markAsPristine();
        myForm.form.markAsUntouched();
        myForm.resetForm();
      }

    }
  }
  
  // Subscripción al método DELETE alojado en el sevicio
  deleteUser(posicionEliminar:number){
    this.usuarioActual = this.usuarios[posicionEliminar];
    this.userService.deleteUser(this.usuarioActual._id).subscribe(( user : any ) => {
      this.usuarios.splice(posicionEliminar, 1);
      console.log('Usuario eliminado');
    },
    err => console.log('Se ha producido un error en la llamada al servicio', err));
  
    this.usuarioActual = {
      _id:"",
      nombre: "",
      apellidos: "",
      edad: "",
      dni: "",
      fechaNacimiento: "",
      colorFavorito: "",
      sexo: ""
    }
  }

}