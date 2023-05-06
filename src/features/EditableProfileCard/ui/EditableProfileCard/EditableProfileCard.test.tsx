import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { componentRender } from '@/shared/lib/testing/componentRender/componentRender'
import { Profile } from '@/entities/Profile'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { $api } from '@/shared/api/api'
import { profileReducer } from '../../model/slice/ProfileSlice'
import { EditableProfileCard } from './EditableProfileCard'

const profile: Profile = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  age: 36,
  currency: Currency.USD,
  country: Country.Belarus,
  city: 'Minsk',
  username: 'JohnDoe1',
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '1',
        username: 'JohnDoe1',
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
}

describe('features/EditableProfileCard', () => {
  test('Readonly mode should be able to toggle', async () => {
    componentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.editButton'))
    expect(screen.getByTestId('EditableProfileCardHeader.cancelButton'))
  })

  test('When canceled, values should be reset to zero', async () => {
    componentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.editButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user-firstname')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user-lastname')

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user-firstname')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user-lastname')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.cancelButton'))

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('John')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('Doe')
  })

  test('Error should be visible', async () => {
    componentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.editButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.saveButton'))

    expect(screen.getByTestId('EditableProfileCard.error.text')).toBeInTheDocument()
  })

  test('PUT request should be called', async () => {
    const mockPutReq = jest.spyOn($api, 'put')
    componentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.editButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'Jack')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.saveButton'))

    expect(mockPutReq).toHaveBeenCalled()
  })
})
