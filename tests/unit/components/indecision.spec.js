import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";
import { jsxEmptyExpression } from "@babel/types";

describe("Indecision Component", () => {
  let wrapper;
  let clgSpy;

  global.fetch = jest.fn( () => Promise.resolve({
    json: () => Promise.resolve({
      answer: "yes",
      forced: false,
      image: "https://yesno.wtf/assets/yes/2.gif"
    })
  }) )

  beforeEach(() => {
    wrapper = shallowMount(Indecision);

    clgSpy = jest.spyOn( console, 'log')

    jest.clearAllMocks()

  });

  test("debe de hacer match con el snapshop", () => {
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <!--v-if-->
      <div class="bg-dark"></div>
      <div class="indecision-container"><input type="text" placeholder="Hazme una pregunta">
        <p>Recuerda terminar con un signo de interrogación(?)</p>
        <!--v-if-->
      </div>
    `);
  })
  
  test('escribir en el input no debe disparar nada (console.log)', async() =>{
      
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

    const input = wrapper.find('input')
    await input.setValue('Hola Mundo')

    expect( clgSpy).toHaveBeenCalledTimes(1)
    expect(getAnswerSpy).toHaveReturnedTimes(0)


  })

  test('escribir el simbolo de "?" debe de disparar el getAswer', async() => {
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

    const input = wrapper.find('input')
    await input.setValue('hola?')

    expect(getAnswerSpy).toHaveBeenCalledTimes(1)


  })

  test('pruebas en getAnswer', async() => {

    await wrapper.vm.getAnswer() 
      
    const img = wrapper.find('img')

    expect( img.exists()).toBeTruthy()
    expect( wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif")
    expect( wrapper.vm.answer ).toBe('Si!')
    


  })

  test('pruebas en getAnswer - Fallo en el API', async() => {

    fetch.mockImplementationOnce( () => Promise.reject('API es down'))

    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')

    expect( img.exists()).toBeFalsy()
    expect( wrapper.vm.answer ).toBe('No se pudo cargar del API')

    
  })






});
