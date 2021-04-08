import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Nudo } from '../models/nudo';
import { RestConfService } from '../services/rest/rest-conf.service';

@Component({
  selector: 'app-conf-nudos',
  templateUrl: './conf-nudos.component.html',
  styleUrls: ['./conf-nudos.component.scss']
})
export class ConfNudosComponent implements OnInit {

  //Mat-table
  dispCols: string[] = ['orden', 'xPos', 'yPos', /*'xFza', 'yFza', 'momem',*/ 'editar', 'borrar'];
  nudos: Nudo[] = [];
  dSNudos: MatTableDataSource<Nudo>;

  // Control de Paneles
  expTable: boolean = true;
  expEdit: boolean = false;
  disTable: boolean = false;
  disEdit: boolean = true;

  //Control form
  newEdit: any = undefined;
  nudoEdit: Nudo = new Nudo;
  nxtOrd: number = 0;

  //Form
  nudoFrm = this.fb.group({
    orden: ['', Validators.required],
    xPos: ['', Validators.required],
    yPos: ['', Validators.required],
    xFza: ['', Validators.required],
    yFza: ['', Validators.required],
    momem: ['', Validators.required]
  });

  @Output() cambioNudos = new EventEmitter();

  constructor(private rest: RestConfService, private fb: FormBuilder, public snackBar: MatSnackBar) { 
    this.dSNudos = new MatTableDataSource<Nudo>();    
  }

  ngOnInit(): void {
    this.obtenerNudos();
  }

  //Rest
  obtenerNudos(): void {
    this.rest.obtenerNudos()
      .subscribe(nudos => {
        //Asignamos orden
        let nro = 1;
        for (let n of nudos) {
          n.orden = nro;
          nro = nro + 1;
          this.nxtOrd = nro; //prox. orden
        }
        this.nudos = nudos;
        this.dSNudos.data = this.nudos;

        //Emitimos mensaje de cambio
        this.cambioNudos.emit("");
      },
        error => {
          console.log(error);
        }
      );
  }
  crearNudo(nudo: Nudo): void {
    this.rest.crearNudo(nudo)
      .subscribe(() => {
        this.obtenerNudos();

        // Mensaje Exitoso
        this.snackBar.open("Nodo creado!");
      },
        () => {
          this.snackBar.open("Error al crear nudo!", 'X', { duration: 10000 });
        }
      );    
  }
  editarNudo(nudo: Nudo): void {
    this.rest.editarNudo(nudo)
      .subscribe(() => {
        this.obtenerNudos();

        // Mensaje Exitoso
        this.snackBar.open("Nodo editado!");
      },
        () => {
          this.snackBar.open("Error al editar nudo!", 'X', { duration: 10000 });
        }
      );
  }
  borrarNudo(nudo: Nudo): void {
    this.rest.borrarNudo(nudo)
      .subscribe(() => {
        this.obtenerNudos();

        // Mensaje Exitoso
        this.snackBar.open("Nodo borrado!");
      },
        () => {
          this.snackBar.open("Error al borrar nudo!", 'X', { duration: 10000 });
        }
      );
  }

  clickBtnDelete(nudoDelete: Nudo): void {this.borrarNudo(nudoDelete)}

  clickBtnEdit(nudoEdit: Nudo): void {
    // Control de Paneles 
    this.disEdit = false;
    this.disTable = true;
    this.expEdit = true;
    this.expTable = false;

    // Formulario
    this.nudoFrm.controls['orden'].setValue(nudoEdit.orden);
    this.nudoFrm.controls['xPos'].setValue(nudoEdit.xPos);
    this.nudoFrm.controls['yPos'].setValue(nudoEdit.yPos);
    this.nudoFrm.controls['xFza'].setValue(nudoEdit.xFza);
    this.nudoFrm.controls['yFza'].setValue(nudoEdit.yFza);
    this.nudoFrm.controls['momem'].setValue(nudoEdit.momem);
    this.newEdit = false;
    this.nudoEdit = nudoEdit;
  }  
  clickBtnNew(): void {
    // Control de Paneles 
    this.disEdit = false;
    this.disTable = true;
    this.expEdit = true;
    this.expTable = false;

    // Formulario
    this.nudoFrm.controls['orden'].setValue(this.nxtOrd);
    this.nudoFrm.controls['xPos'].setValue(0);
    this.nudoFrm.controls['yPos'].setValue(0);
    this.nudoFrm.controls['xFza'].setValue(0);
    this.nudoFrm.controls['yFza'].setValue(0);
    this.nudoFrm.controls['momem'].setValue(0);
    this.newEdit = true;
    this.nudoEdit = new Nudo;
  }
  clickBtnSave(): void {
    // Control de Paneles
    this.expEdit = false;
    this.expTable = true;
    this.disEdit = true;
    this.disTable = false;
  }
  clickBtnCancel(): void {
    // Control de Paneles
    this.expEdit = false;
    this.expTable = true;
    this.disEdit = true;
    this.disTable = false;
    this.newEdit = undefined;
  }
  guardarFrm(): void {
    this.nudoEdit.orden = this.nudoFrm.controls['orden'].value;
    this.nudoEdit.xPos = this.nudoFrm.controls['xPos'].value;
    this.nudoEdit.yPos = this.nudoFrm.controls['yPos'].value;
    this.nudoEdit.xFza = this.nudoFrm.controls['xFza'].value;
    this.nudoEdit.yFza = this.nudoFrm.controls['yFza'].value;
    this.nudoEdit.momem = this.nudoFrm.controls['momem'].value;

    if (this.newEdit === true) {      
      this.crearNudo(this.nudoEdit);
    } else if (this.newEdit === false) {
      this.editarNudo(this.nudoEdit);
    }

    // Control formulario
    this.newEdit = undefined;
    this.nudoEdit = new Nudo;
  }

}
