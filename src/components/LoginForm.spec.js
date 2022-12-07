import { shallowMount } from '@vue/test-utils';
//import Vue from 'vue';
import LoginForm from './LoginForm.vue';
describe('LoginForm.vue', () => {
  test('ID 는 이메일 형식이어야 한다.', () => {
    const wrapper = shallowMount(LoginForm);
    const idInput = wrapper.find('#username');
    console.log(idInput.html());
    //expect(wrapper.vm.username).toBe('');
  });
});
