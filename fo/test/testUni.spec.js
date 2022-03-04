import { shallowMount } from '@vue/test-utils'
import Events from '@/components/Events'
import { Store } from 'vuex-mock-store'

// create the Store mock
const store = new Store({
    state: {
        events: {
            all: {
                items: {
                    //A remplir
                }
            }
        },
        users: {}
    },
    getters: { doubleCount: 0 },
  });
  // add other mocks here so they are accessible in every component
  const mocks = {
    $store: store,
  };

  // reset spies, initial state and getters
  afterEach(() => store.reset());

describe('Events.vue', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = shallowMount(Events, { mocks })
    });

    it('Events est une instance Vue', () => {

        expect(wrapper.isVueInstance()).toBe(true)
    });

    it('Au moins un évenement existe sur la page events', () => {
        expect(wrapper.find('router-link').selector).toBe("router-link")
    });

    it('Test store', () => {
        expect(mocks.$store._initialState.events.all.items).toStrictEqual({})
    })
});