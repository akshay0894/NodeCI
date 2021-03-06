const Page= require('./helpers/page');
 let page;
beforeEach(async ()=>{
     
     page= await Page.build();
  // console.log(page);
    await page.goto('http://localhost:3000');
})

afterEach(async()=>{
   await page.close();
})

test('the header has  the correct text', async()=>{
  const text = await page.$eval('a.brand-logo', el=>el.innerHTML);
  expect(text).toEqual('Blogster');

})

// test('clicking login starts oauth flow ',async ()=>{
//   await page.click('.right a');
//   const url =await page.url();
//   expect(url).toMatch(/accounts\.google\.com/);
// })

// test.only('when signed in , shows logout button',async ()=>{
//     await page.login();
//     const text=await page.getContents('a[href="/auth/logout"]');
//     console.log(text);
//    expect(text).toEqual('Logout');
// })