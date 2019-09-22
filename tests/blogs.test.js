const Page= require('./helpers/page');

let page;

beforeEach(async ()=>{
    page=await Page.build();
    await page.goto('http://localhost:3000');
})

afterEach(async ()=>{
    await page.close();
})


describe('when logged in ',async()=>{

    beforeEach(async ()=>{
        await page.login();
        await page.click('a.btn-floating');
    })

    test('can see blog create form ',async ()=>{
        const label=await page.getContents('form label');
        expect(label).toEqual('Blog Title');
       })

       describe('and using valid inputs',async()=>{
           beforeEach(async()=>{
               page.type('.title input', 'My Title');
               page.type('.content input', 'My Content');
               page.click('form button');
           })

           test('submitting take user to review screen',async ()=>{
              const text= await page.getContents('h5');
              expect(text).toEqual('Please confirm your entries');
           })

           test('submitting then saving add blogs to the index page',async ()=>{
                await page.click('button.green');
                await page.waitFor('.card');

                const title= await page.getContents('.card-title');
                const content= await page.getContents('p');
                expect(title).toEqual('My Title');
                expect(content).toEqual('My Content');
           })
       })

       describe('and invalid input',async()=>{
           beforeEach(async ()=>{
            await page.click('form button');
           })
          test('shows invalid error',async ()=>{
              const titleError= await page.getContents('.title .red-text');
            const contentError= await page.getContents('.content .red-text');
                console.log(titleError,contentError);
            expect(titleError).toEqual('You must provide a value');
            
            expect(contentError).toEqual('You must provide a value');
          })

       })
       

})