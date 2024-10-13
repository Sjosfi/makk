import { Controller, Get, Render, Res, Post, } from '@nestjs/common';
import { AppService } from './app.service';
import { Body } from '@nestjs/common';
import { fizetesDTO } from './fizetesDTO.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('kitolt')
  @Render('megerosites')
  getMegerosites() {
    let messages = [];
    return {messages: messages, nev: undefined, szam: undefined}
  }

  @Post('kitolt')
  @Render('megerosites')
  postMegerosites(@Body() paymentDTO: fizetesDTO, @Res() response: any) {
    let messages = [];
    if (paymentDTO.nev.length < 1 || !paymentDTO.nev.includes(" ")) {
      messages.push("rossz a név")
    }
    const accountNumberPattern = /^\d{8}-\d{8}(-\d{8})?$/;
    if (!accountNumberPattern.test(paymentDTO.szam)) {
      messages.push('Hiba van a bankszámlaszámmal!');
    }
    if (paymentDTO.elfogad != "elfogad") {
      messages.push("Nem fogadta el!")
    }
    if(messages.length == 0){
      return response.redirect("/siker")
    }else{
      return {messages: messages, nev:paymentDTO.nev, szam:paymentDTO.szam}
    }
  }

  @Get('siker')
  @Render('siker')
  getSiker(){

  }
}
