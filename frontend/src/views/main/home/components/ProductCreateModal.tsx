import { DialogBody, DialogFooter } from '@material-tailwind/react'

import { FilledButton } from '@/components/button/FilledButton'
import { buttonStyle } from '@/components/button/index'
import { OutlinedButton } from '@/components/button/OutlinedButton'
import { TitledDialog } from '@/components/dialog/TitledDialog'
import { NumberForm } from '@/components/form/NumberForm'
import { TextAreaForm } from '@/components/form/TextAreaForm'
import { TextForm } from '@/components/form/TextForm'

interface Props {
  show: boolean
  name: string
  imageURL: string
  description: string
  price: number
  errorMessage: string
  handleChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeImageURL: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleChangePrice: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
  onCreate: (e: React.MouseEvent<HTMLElement>) => void
}

export const ProductCreateModal = (props: Props) => {
  const {
    show,
    name,
    imageURL,
    description,
    price,
    errorMessage,
    handleChangeName,
    handleChangeImageURL,
    handleChangeDescription,
    handleChangePrice,
    onClose,
    onCreate,
  } = props

  return (
    <TitledDialog show={show} header="New Product" onClose={onClose}>
      <DialogBody className="block" divider>
        <div className="mb-3">
          <p className="text-sm text-red-600 mb-3">{errorMessage}</p>
          <div className="mb-3">
            <TextForm id="product_name" label="Product Name" val={name} handleChange={handleChangeName} />
          </div>
          <div className="mb-3">
            <TextForm
              id="image"
              label="Image URL"
              val={imageURL}
              placeholder="https://xxxx.png"
              handleChange={handleChangeImageURL}
            />
          </div>
          <div className="mb-3">
            <TextAreaForm
              id="description"
              label="Description"
              val={description}
              handleChange={handleChangeDescription}
            />
          </div>
          <div className="mb-3">
            <NumberForm id="price" label="Price(ETH)" val={price} handleChange={handleChangePrice} />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="mr-2">
          <OutlinedButton color={buttonStyle.color.red} label="Cancel" onClick={onClose} />
        </div>
        <FilledButton label="Create" onClick={onCreate} />
      </DialogFooter>
    </TitledDialog>
  )
}
