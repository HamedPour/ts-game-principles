import { IComponent } from './component.h'
import { IAwake, IUpdate } from '@/utils'

type constr<T> = {new(...args: unknown[]): T}

export abstract class Entity implements IAwake,IUpdate {
  protected _components: IComponent[] = []

  // Wake me up before you go-go
  public Awake(): void {
    for(const component of this._components) {
      component.Awake()
    }
  }

  // game loop update
  public Update(deltaTime: number): void {
    for (const component of this._components) {
      component.Update(deltaTime)
    }
  }

  // public getter that returns all the components of the entity
  public get Components(): IComponent[] {
    return this._components
  }

  // Add component and sets a reference to the entity
  public AddComponent(component: IComponent): void {
    this._components.push(component)
    component.Entity = this
  }

  // method takes a type (think: class) and returns a reference of
  // the component of that type
  public GetComponent<C extends IComponent>(constr: constr<C>): C {
    for (const component of this._components) {
      if (component instanceof constr) {
        return component as C
      }
    }
    throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
  }
  
  // method takes a type (think: class) retuns nothing and removes the component fron the entity
  public RemoveComponent<C extends IComponent>(constr: constr<C>): void {
    let toRemove: IComponent | undefined
    let index: number | undefined

    // before we can splice we have to first find the index of the component
    // we do this by using this for loop to find the type matching constr and
    // therefore the index of it
    for (let i = 0; i< this._components.length; i++) {
      const component = this._components[i]
      if (component instanceof constr) {
        toRemove = component
        index = i
        break
      }
    }

    if (toRemove && index) {
      toRemove.Entity = null
      this._components.splice(index, 1)
    }
  }

  // methods to check if there is a component of a specific type
  public HasComponent<C extends IComponent>(constr: constr<C>): boolean {
    for (const component of this._components)  {
      if (component instanceof constr) {
        return true
      }
    }
    return false
  }
}