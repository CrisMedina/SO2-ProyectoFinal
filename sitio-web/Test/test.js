const assert = require('assert')
const { expect } = require('chai');
const puppeteer = require('puppeteer')

describe('Smoke-Test', function () {
    let page;
    let browser;
  
    before (async function () {
      browser = await puppeteer.launch({
        headless: false, timeout: 0});
      page = await browser.newPage();
      //await page.goto('http://localhost:4200/');
    });

    after(async () => {
        await browser.close()
    })
  
    it('should have the correct page title', async function () {
      await page.goto('http://localhost:4200/');
      expect(await page.title()).to.eql('SitioWeb');
    });

    const register = {
      nombre:'input[name="nombres"]',
      apellido:'input[name="apellidos"]',
      dpi:'input[name="dpi"]',
      correo:'input[name="correo"]',
      cuenta: 'input[name="no_cuenta"]',
      saldo:'input[name="saldo"]',
      password: 'input[name="clave"]',
      confirmacion:'input[name="confirm"]',
      registerButton: 'button'
    }

    it('REGISTRO --- should register inputs and button', async () => { /* simple test case */
        await page.goto('http://localhost:4200/register/');
        await page.waitFor(register.nombre);
        await page.type(register.nombre,"Pruebas");
        await page.type(register.apellido, "Funcionales");
        await page.type(register.dpi, "26042021");
        await page.type(register.correo,"correo@gmail.com");
        await page.type(register.cuenta,"26042021");
        await page.type(register.saldo, "1000");
        await page.type(register.password,"12345");
        await page.type(register.confirmacion,"12345");
        await page.click(register.registerButton);
        await page.screenshot({path:'Test/Capturas/registro.png',fullpage:true});
    });

    const loginPage = {
        cuenta: 'input[name="cuenta"]',
        password: 'input[name="clave"]',
        loginButton: 'button'
    }

    it('LOGIN --- should login inputs and button', async () => { /* simple test case */
        await page.goto('http://localhost:4200/');
        await page.waitFor(loginPage.cuenta);
        await page.type(loginPage.cuenta,"14022020");
        await page.type(loginPage.password, "123");
        await page.screenshot({path:'Test/Capturas/loginpage.png',fullpage:true});
        await page.click(loginPage.loginButton);
    });

    it('PERFIL --- verifica la pagina de perfil', async () => { /* simple test case */
      await page.goto('http://localhost:4200/home/');
      await page.screenshot({path:'Test/Capturas/Perfil.png',fullpage:true});
  });

    const TransferenciaPage = {
      cuenta_destino: 'input[name="cuenta_destino"]',
      monto: 'input[name="monto"]',
      transferenciaButton: 'button[name="transferir"]'
  }

  it('TRANSFERENCIA --- should Transferencia inputs', async () => { /* simple test case */
      await page.goto('http://localhost:4200/transferencia/');
      await page.waitFor(TransferenciaPage.cuenta_destino);
      await page.type(TransferenciaPage.cuenta_destino,"1275009628");
      await page.type(TransferenciaPage.monto, "5");
      await page.click(TransferenciaPage.transferenciaButton);
      await page.screenshot({path:'Test/Capturas/TransferenciaPage.png',fullpage:true});
  });

  it('CONSULTA DE SALDO --- verifica la pagina de saldo', async () => { /* simple test case */
    await page.goto('http://localhost:4200/consulta/');
    await page.screenshot({path:'Test/Capturas/Consulta.png',fullpage:true});
});

});


