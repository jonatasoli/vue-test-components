import GithubCard from '@/github-card'
import { mount } from '@vue/test-utils'

describe('methods', () => {
  test('composeUrl', () => {
    const { composeUrl } = GithubCard.methods
    expect(composeUrl(123)).toBe('https://api.github.com/users/123')
  })

  test('fetchData', async() => {
    const jsonMock = jest.fn().mockResolvedValue('GITHUB DATA')
    window.fetch = jest.fn().mockResolvedValue({
      json: jsonMock
    })

    const wrapper = mount(GithubCard)
    wrapper.setData({ username: 'jonatasoli' })


    await wrapper.vm.fetchData()

    expect(window.fetch).toHaveBeenCalledWith('https://api.github.com/users/jonatasoli')
    expect(jsonMock).toHaveBeenCalled()
    expect(wrapper.vm.data).toBe('GITHUB DATA')
  })

})
