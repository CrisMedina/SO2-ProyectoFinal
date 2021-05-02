import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveUserService } from '../../services/active-user.service';
import { ReporteService } from '../../services/reporte.service';

import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import {ITable} from 'pdfmake-wrapper/lib/interfaces'
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  transferencias: any[] = [];
  id: string = '';
  cuenta: string = '';

  constructor(
    private activeuserservice: ActiveUserService,
    private reporteservice: ReporteService,
    private router: ActivatedRoute
  ) {
    this.obtenerTranferencias();
   }

  ngOnInit(): void {
  }

  obtenerTranferencias() {
    let saldoanterior = 0;
    this.id = this.activeuserservice.getIdUserLogged();

    this.reporteservice.getTranferenciasUser(this.id)
      .subscribe((transfer: any) => {
        console.log(transfer);
        saldoanterior = transfer[0].saldo;
        console.log(saldoanterior);
        transfer.map(trans => {
          trans.saldo = saldoanterior;
          trans.debito = 0;
          trans.credito = 0;
          if (trans.id_usuario_envia == this.id){
            trans.debito = trans.monto;
            trans.descripcion = 'Transferencia a ' + trans.recibe;
            saldoanterior += trans.monto;
          }
          else {
            trans.credito = trans.monto;
            trans.descripcion = 'Depósito de ' + trans.envia;
            saldoanterior -= trans.monto;
          }
          console.log('saldo ' + saldoanterior);
        });
        this.transferencias = transfer;
      })
  }

  generarPDF() {
    const pdf = new PdfMakeWrapper();
    const ncuenta = this.activeuserservice.getCuentaUserLogged();
    const nombre = this.activeuserservice.getNombreCompleto();
    
    pdf.header(new Txt(`${ncuenta}-${nombre}`).alignment('center').bold().fontSize(9).end)
    pdf.add(new Txt(`Reporte de transferencias - ${ncuenta}\n\n`).alignment('center').bold().fontSize(16).end);
    pdf.add(this.crearTabla());
    pdf.footer(new Txt('One Bank - AyD1 - Grupo #1').alignment('center').bold().fontSize(9).end);

    pdf.create().open();
  }

  crearTabla(): ITable {
    return new Table([
      [new Txt('Fecha').bold().end, new Txt('Hora').bold().end, new Txt('Descripción').bold().end, new Txt('Crédito').bold().end, new Txt('Débito').bold().end, new Txt('Saldo').bold().end],
      ...this.obtenerFilas()
    ])
    .alignment("center")
    .fontSize(12)
    .layout({
      fillColor: (rowIndex: number) => {
        return rowIndex === 0 ? '#CCCCCC' : ''
      }
    })
    .relativePosition(70,20)
    .end;
  }

  obtenerFilas() {
    return this.transferencias.map(row => [row.fecha, row.hora, row.descripcion, row.credito, row.debito, row.saldo]);
  }

}
