import React, { useState } from 'react';
import Navbare from '../Navbare/Navbare';
import { useParams } from 'react-router-dom';
import Users from '../../Users';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { addExistUserPost, addNewUserPost, addPostComment } from '../../../Redux/Reducers/ProfileSlice/ProfileSlice';


const Profile = () => {
    const { key } = useParams();
    const userProfile = Users.find((user) => user.id === key);
    const [isCommanting, setIsCommanting] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [postComment, SetPostComment] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const user = useSelector(state => state.userSl);
    const posts = useSelector(state => state.profile.posts);
    const dispatch = useDispatch();

    const sharePost = () => {
        const indexPost = posts.findIndex((post) => post.id === user.actualUser.id);
      
        if (indexPost !== -1) {
            dispatch(
                addExistUserPost({
                    pos: indexPost,
                    morePost: {
                        image: user.actualUser.img,
                        name: user.actualUser.name,
                        content: postContent,
                        media: mediaFile,
                        comments: [],
                        likes: []
                    },
                })
            );
        } else {
            dispatch(
                addNewUserPost({
                    id: user.actualUser.id,
                    postes: [
                        {
                            image: user.actualUser.img,
                            name: user.actualUser.name,
                            content: postContent,
                            media: mediaFile,
                            comments: [],
                            likes: []
                        },
                    ],
                })
            );
        }
    };
    const userPost = posts.find((posta) => posta.id === key);

    const addComment = (index) => {
            dispatch(addPostComment({
                id: key,
                key: index,
                comment: postComment,
                img:user.actualUser.img,
                name: user.actualUser.name + ' ' + user.actualUser.familyName
            }));
            setIsCommanting(false);
            SetPostComment('')
    };
    const handleMediaChange = (e) => {
        setMediaFile(e.target.files[0]);
    };


    return (
        <div>
            <div>
                <Navbare />
            </div>
            <div className='images'>
                <img className='profile' src={"../../" + userProfile.img} alt="" />
                <img className='cover' src={"../../" + userProfile.cover} alt="" />
                <div className='description'>
                    <h3> {userProfile.name} {userProfile.familyName} </h3>
                    <p>{userProfile.quote}</p>
                </div>
            </div>
            <div className='posts-side'>
                {key === user.actualUser.id && (
                    <div className="posts">

                        <div className="post-input">
                            <img src={"../../" + userProfile.img} alt="" />
                            <div className="post-share">
                                <textarea
                                    placeholder="What's on your mind ??"
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                ></textarea>
                                <div className='media'>
                                    <input
                                        type="file"
                                        accept="image/*, video/*"
                                        onChange={handleMediaChange}
                                    />
                                    <button onClick={sharePost}>Share</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {userPost && userPost.postes ? userPost.postes.map((post,index) => (
                    <div className="shared-posts">
                        <div className='post-owner'>
                            <img src={"../../" + post.image} alt="" />
                            <h6>{post.name}</h6>
                        </div>
                        <p>{post.content}</p>
                        {post.media && (
                            <div className='media-shared'>
                                {post.media instanceof Blob && post.media.type.startsWith("image/") ? (
                                    <img src={URL.createObjectURL(post.media)} alt="Selected Image" />
                                ) : (
                                    <video controls>
                                        <source src={URL.createObjectURL(post.media)} type={post.media.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        )}
                        <div className='countes'>
                            <p>like</p>
                            <p>comment</p>
                        </div>
                        <div className='likes'>
                            <button><i class="fa-solid fa-thumbs-up"></i> {post.idPost}</button>
                            <button onClick={() =>setIsCommanting(!isCommanting)}><i class="fa-solid fa-comment"></i> COMMENT</button>
                        </div>
                        <div className='post-comment'>
                            {isCommanting && (
                                <div className="write-comment">
                                    <textarea placeholder="Add your comment..." value={postComment} onChange={(e) => SetPostComment(e.target.value)}></textarea>
                                    <button onClick={() => addComment(index)}>Comment</button>
                                </div>
                            )}
                      {post.comments.map((com)=>(
                                <div className='posted-comment'>
                                    <img src={"../../" + com.img} alt="" />
                                    <div className='comment-owner'>
                                        <h6>{com.name}</h6>
                                        <p>{com.comment}</p>
                                    </div>
                                </div>
                                ))}
                      
                        </div>
                    </div>
                )) : <div className='noPost'><p>No Post Yet</p></div>}



            </div>
            <div className='intro'>
                <h2>Intro</h2>
                <h6><i class="fa-solid fa-envelope"></i> {userProfile.email}</h6>
                <h6><i class="fa-solid fa-house"></i> {userProfile.adress}</h6>
                <button>Edit Details</button>
                <button>Add More</button>
            </div>

        </div>
    )
}

export default Profile