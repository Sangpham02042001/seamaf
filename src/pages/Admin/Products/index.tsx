import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Tag,
  Space,
  message,
  Button,
  Modal,
  Input,
  Select,
  Checkbox,
} from "antd";
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { RootState } from "../../../store";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../../store/reducers/admin/products";
import { getCategories } from "../../../store/reducers/categories";

const { Option } = Select;

export default function Products() {
  const adminProducts = useSelector((state: RootState) => {
    return state.adminProducts;
  });

  const categoryReducer = useSelector((state: RootState) => {
    return state.category;
  });

  const dispatch = useDispatch();
  const [newProductModal, setNewProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategoryId, setNewProductCategoryId] = useState(0);
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newTopProduct, setNewTopProduct] = useState(false);
  const [newSaleProduct, setNewSaleProduct] = useState(false);
	const [newProductImages, setNewProductImages] = useState<any>([]);
	const [imageLink, setImageLink] = useState('')
	const [imageModalShow, setImageModalShow] = useState(false)

  const [editModalShow, setEditModalShow] = useState(false)
  const [currentProductId, setCurrentProductId] = useState(0)
  const [currentProductName, setCurrentProductName] = useState('')
  const [currentProductDescription, setCurrentProductDescription] = useState('')
  const [currentProductCategoryId, setCurrentProductCategoryId] = useState(0)
  const [currentProductPrice, setCurrentProductPrice] = useState(0)
  const [currentTopProduct, setCurrentTopProduct] = useState(false)
  const [currentSaleProduct, setCurrentSaleProduct] = useState(false)
  const [currentProductImages, setCurrentProductImages] = useState<any>([])

  useEffect(() => {
    if (!categoryReducer.loaded) {
      dispatch(getCategories());
    }
  }, [categoryReducer.loaded]);

  useEffect(() => {
    if (!adminProducts.loaded) {
      dispatch(getProducts());
    }
  }, [adminProducts.loaded]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "code",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Top Product",
      dataIndex: "is_top",
      key: "topProduct",
    },
    {
      title: "Sale Product",
      dataIndex: "on_sale",
      key: "saleProduct",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <span className="admin-edit-btn" onClick={handleEditProduct(record.id)}>Edit</span>
          <span onClick={handleDeleteProduct(record.id)}  
            className="admin-delete-btn">Delete</span>
        </Space>
      ),
    },
  ];

  const handleDeleteProduct = (productId: any) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(deleteProduct(productId))
  }

  const handleEditProduct = (productId: any) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault()
    let product = adminProducts.products.find((p: any) => p.id == productId)
    if (product) {
      setCurrentProductId(productId)
      setCurrentProductName(product.name)
      setCurrentProductDescription(product.description)
      setCurrentProductPrice(product.price)
      setCurrentTopProduct(product.is_top)
      setCurrentSaleProduct(product.on_sale)
      setCurrentProductImages(product.images)
      setEditModalShow(true)
    }
  }

  const cancelEdit = () => {
    setEditModalShow(false)
  }

  const confirmEdit = () => {
    if (!currentProductName) {
      message.warning('Name must be filled')
      return
    }
    if (!currentProductPrice) {
      message.warning('Price must be filled')
      return
    }
    if (!currentProductDescription) {
      message.warning('Description must be filled')
      return
    }
    if (!currentProductImages.length) {
      message.warning('Product must have at least one image')
      return
    }
    dispatch(updateProduct({
      id: currentProductId,
      name: currentProductName,
      category_id: currentProductCategoryId,
      description: currentProductDescription,
      price: currentProductPrice,
      is_top: currentTopProduct ? 1 : 0,
      on_sale: currentSaleProduct ? 1 : 0,
      images: currentProductImages.map((image: any) => image.path)
    }))
    setEditModalShow(false)
  }

  const confirmCreate = () => {
    if (!newProductName) {
      message.warning('Name must be filled')
      return
    }
    if (!newProductDescription) {
      message.warning('Description must be filled')
      return
    }
    if (!newProductPrice) {
      message.warning('Price must be a number')
      return
    }
    if (!setNewProductCategoryId) {
      message.warning('New product must belong to the specific category')
      return
    }
    if (!newProductImages.length) {
      message.warning('Product must has at least 1 image link')
      return
    }
    dispatch(createProduct({
      name: newProductName,
      description: newProductDescription,
      price: newProductPrice,
      category_id: newProductCategoryId,
      is_top: newTopProduct ? 1 : 0,
      on_sale: newSaleProduct ? 1 : 0,
      images: newProductImages
    }))
  };

  useEffect(() => {
    if (newProductModal) {
      message.success('Create product successfully')
      setNewProductModal(false)
    }
  }, [adminProducts.products.length])

  const cancelCreate = () => {
    setNewProductModal(false);
  };

	const cancelAddImage = () => {
		setImageModalShow(false)
		setImageLink('')
	}

	const confirmAddImage = () => {
		if (!editModalShow) {
      setNewProductImages([
        ...newProductImages,
        imageLink
      ])
    } else {
      setCurrentProductImages([
        ...currentProductImages,
        {
          path: imageLink
        }
      ])
    }
		setImageLink('')
		setImageModalShow(false)
	}

	const removeImage = (idx: number) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		let arr = [...newProductImages]
		arr.splice(idx, 1)
		setNewProductImages(arr)
	}

  const removeCurrentImage = (idx: number) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault()
    let arr = [...currentProductImages]
    arr.splice(idx, 1)
    setCurrentProductImages(arr)
  }

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <Button
          type="link"
          onClick={(e) => {
            e.preventDefault();
            setNewProductModal(true);
          }}
        >
          New Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={adminProducts.products.map((p: any) => ({
          ...p,
          key: p.id,
          categoryName: p.category.name,
        }))}
      />

      <Modal
        title="New Product"
        visible={newProductModal}
        onOk={confirmCreate}
        onCancel={cancelCreate}
      >
        <label htmlFor="new-product-name">Name</label>
        <Input
          type="text"
          id="new-product-name"
          value={newProductName}
          onChange={(e) => {
            setNewProductName(e.target.value);
          }}
          required
        />
        <br />
        <br />

        <label htmlFor="new-product-category">Category</label>
        <Select
          id="new-product-category"
          onChange={(value) => setNewProductCategoryId(value)}
          style={{ width: "100%" }}
        >
          {categoryReducer.categories.map((category: any) => (
            <Option key={category.id} value={category.id}>{category.name}</Option>
          ))}
        </Select>
        <br />
        <br />

        <label htmlFor="new-product-description">Description</label>
        <Input
          type="text"
          id="new-product-description"
          value={newProductDescription}
          onChange={(e) => setNewProductDescription(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="new-product-price">Price</label>
        <Input
          type="number"
          id="new-product-price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(Number(e.target.value))}
        />
        <br />
        <br />

        <Checkbox
          checked={newTopProduct}
          onChange={(e) => setNewTopProduct(e.target.checked)}
        >
          Top product
        </Checkbox>
				<br /><br />

				<Checkbox checked={newSaleProduct} 
					onChange={e => setNewSaleProduct(e.target.checked)}>
					Sale Product
				</Checkbox>
				<br /><br />
				
				<label style={{fontSize: '18px', cursor: 'pointer'}} onClick={e => {
					e.preventDefault()
					setImageModalShow(true)
				}}>
					Images <PlusCircleOutlined />	
				</label>
				{newProductImages.map((img: any, idx: number) => {
					return <p style={{fontSize: '16px'}} key={idx}>
						<a target="_blank" style={{textDecoration: 'underline', color: 'blue'}} href={img}>{img}</a> <span onClick={removeImage(idx)}>
								<DeleteOutlined style={{cursor: 'pointer'}} />
							</span>
					</p>
				})}
      </Modal>

			<Modal title="Add image link" visible={imageModalShow} onCancel={cancelAddImage} onOk={confirmAddImage}>
				<Input type='text' value={imageLink} placeholder="Image link"
					onChange={e => setImageLink(e.target.value)}  />
			</Modal>

      <Modal title="Edit Product" visible={editModalShow} onCancel={cancelEdit} onOk={confirmEdit}>
      <label htmlFor="new-product-name">Name</label>
        <Input
          type="text"
          id="new-product-name"
          value={currentProductName}
          onChange={(e) => {
            setCurrentProductName(e.target.value);
          }}
          required
        />
        <br />
        <br />

        <label htmlFor="new-product-category">Category</label>
        <Select
          id="new-product-category"
          onChange={(value) => setCurrentProductCategoryId(value)}
          style={{ width: "100%" }}
          value={currentProductCategoryId}
        >
          {categoryReducer.categories.map((category: any) => (
            <Option key={category.id} value={category.id}>{category.name}</Option>
          ))}
        </Select>
        <br />
        <br />

        <label htmlFor="new-product-description">Description</label>
        <Input
          type="text"
          id="new-product-description"
          value={currentProductDescription}
          onChange={(e) => setCurrentProductDescription(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="new-product-price">Price</label>
        <Input
          type="number"
          id="new-product-price"
          value={currentProductPrice}
          onChange={(e) => setCurrentProductPrice(Number(e.target.value))}
        />
        <br />
        <br />

        <Checkbox
          checked={currentTopProduct}
          onChange={(e) => setCurrentTopProduct(e.target.checked)}
        >
          Top product
        </Checkbox>
				<br /><br />

				<Checkbox checked={currentSaleProduct} 
					onChange={e => setCurrentSaleProduct(e.target.checked)}>
					Sale Product
				</Checkbox>
				<br /><br />

        <label style={{fontSize: '18px', cursor: 'pointer'}} onClick={e => {
					e.preventDefault()
					setImageModalShow(true)
				}}>
					Images <PlusCircleOutlined />	
				</label>
        {currentProductImages.map((img: any, idx: number) => {
          return <p style={{fontSize: '16px'}} key={idx}>
            <a target="_blank" style={{textDecoration: 'underline', color: 'blue'}} href={img.path}>{img.path}</a> <span onClick={removeCurrentImage(idx)}>
                <DeleteOutlined style={{cursor: 'pointer'}} />
              </span>
          </p>
        })}
      </Modal>
    </>
  );
}
