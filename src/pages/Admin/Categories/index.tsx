import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag, Space, message, Modal, 
	Button, Input } from "antd";
import { RootState } from "../../../store";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../../store/reducers/categories";

export default function Categories() {
  const adminCategories = useSelector((state: RootState) => {
    return state.category;
  });
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [newModalShow, setNewModalShow] = useState(false)
	const [editModalShow, setEditModalShow] = useState(false)
	const [currentCategoryId, setCurentCategoryId] = useState(0)

  const cancelCreate = () => {
    setNewModalShow(false);
  };

  const confirmCreate = () => {
		if (!name) {
			message.warning('Name must be filled')
			return
		}
		dispatch(createCategory(name))
	};

	const handleEdit = (categoryId: any) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		setEditModalShow(true)
		setCurentCategoryId(categoryId)
		setName(adminCategories.categories.find((c: any) => c.id == categoryId).name)
	}

	const handleDelete = (categoryId: any) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		dispatch(deleteCategory(categoryId))
	}

	const cancelEdit = () => {
		setEditModalShow(false)
	}

	const confirmEdit = () => {
		if (!name) {
			message.warning('Name must be filled')
			return
		}
		dispatch(updateCategory({
			id: currentCategoryId,
			name: name
		}))
		setEditModalShow(false)
	}

  useEffect(() => {
    if (!adminCategories.loaded) {
      dispatch(getCategories());
    }
  }, [adminCategories.loaded]);

	useEffect(() => {
		if (newModalShow) {
			message.success('Create category successfully')
			setNewModalShow(false)
		}
	}, [adminCategories.categories.length])

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
          <span onClick={handleEdit(record.id)} className="admin-edit-btn">Edit</span>
          <span onClick={handleDelete(record.id)}
            className="admin-delete-btn">Delete</span>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <Button
          type="link"
          onClick={(e) => {
            e.preventDefault();
            setNewModalShow(true);
          }}
        >
          New Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={adminCategories.categories.map((c: any) => ({
          ...c,
          key: c.id,
        }))}
      />

      <Modal
        title="New category"
        onCancel={cancelCreate}
        onOk={confirmCreate}
        visible={newModalShow}
      >
				<label htmlFor="new-category-name">Category name</label>
        <Input
          type="text"
          id="new-category-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Category name"
          required
        />
        <br /> <br />
			</Modal>

			<Modal
        title="Edit category"
        onCancel={cancelEdit}
        onOk={confirmEdit}
        visible={editModalShow}
      >
				<label htmlFor="new-category-name">Category name</label>
        <Input
          type="text"
          id="new-category-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Category name"
          required
        />
        <br /> <br />
			</Modal>
    </>
  );
}
