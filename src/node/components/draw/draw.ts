import { IComponent } from '@/utils'
import { Node } from '@/node'

export class NodeDrawComponent implements IComponent {
  public Entity: Node

  public Awake(): void {
    // do stuff
  }

  public Update(deltaTime: number): void {
    // do stuff
  }
}