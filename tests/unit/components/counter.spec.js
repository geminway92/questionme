import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter Component", () => {
    let wrapper;
  
    beforeEach(() => {
        wrapper = shallowMount(Counter)
    })

    test("debe de hacer match con el snapshot", () => {

    // expect(wrapper.html()).toMatchInlineSnapshot(`
    //   <h2>Counter</h2>
    //   <p>100<sup>2</sup>= 10000</p>
    //   <div><button>+1</button><button>-1</button></div>
    // `);
  });

    test( 'h2 debe de tener el valor por defecto "Counter"', () => {

        expect( wrapper.find('h2').exists() ).toBe(true)
        
        const h2Value = wrapper.find('h2').text()
        
        expect( h2Value ).toBe('Counter')
    })

    test('el valor por defecto debe ser 100 en el p', () => {

        // Wrapper
        // pTags
        const pTags = wrapper.find('[data-testid="counter"]').text()

        // expect segundo p === 100
        expect( pTags).toBe( '100')

    })

    test('debe incrementar y decrementar el valor del contador', async() => {
        
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')
    
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const value = wrapper.find('[data-testid="counter"]').text()
        
        expect( value ).toBe('101')
    
    })

    test('debe de establecer el valor por defecto', () => {

        const {start} = wrapper.props()

        const value = wrapper.find('[data-testid="counter"]').text()

        expect( Number(value) ).toBe( start )

    } )
    
    test('debe de mostrar la prop title', () => {

        const title = 'Hola Mundo!!!'

        const wrapper = shallowMount( Counter, {
            props: {
                title
            }
        })

        expect( wrapper.find('h2').text()).toBe(title) 


    })
});
