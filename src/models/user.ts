import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  code: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  ctzid: string

  @Column()
  phone: string

  @Column()
  plan: string

  @Column()
  place: string

  @Column()
  building: string

  @Column()
  room: string

  @Column()
  group: string

  @Column()
  sec: number

  @Column()
  row: number
}
