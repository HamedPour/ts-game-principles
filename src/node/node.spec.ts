import { NodeDrawComponent } from './components'
import { Node } from './node'


describe('>>> Node', () => {
  let node: Node

  beforeEach(()=> {
    node = new Node()
  })

  it('should awake and update all components', ()=> {
    const spyDrawCompAwake = jest.spyOn(NodeDrawComponent.prototype, 'Awake')
    const spyDrawCompUpdate = jest.spyOn(NodeDrawComponent.prototype, 'Update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyDrawCompUpdate).not.toBeCalled()

    node.Awake()
    expect(spyDrawCompAwake).toBeCalled()

    node.Update(0)
    expect(spyDrawCompUpdate).toBeCalled()
  })
})
